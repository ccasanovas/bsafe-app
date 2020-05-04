<?php

namespace App\Controller;

use App\Entity\ApiContacts;
use App\Entity\ApiUser;
use App\Entity\ApiUserLocation;
use App\Entity\ApiUserPushTokens;
use App\Entity\FeedQuote;
use App\Validator\NewUserRequest;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ApiContactController extends AbstractController
{
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->apiContactRepository = $entityManager->getRepository(ApiContacts::class);
        $this->apiUserRepository = $entityManager->getRepository(ApiUser::class);
        $this->apiUserPushRepository = $entityManager->getRepository(ApiUserPushTokens::class);
        $this->feedQuoteRepository = $entityManager->getRepository(FeedQuote::class);
        $this->apiUserLocation = $entityManager->getRepository(ApiUserLocation::class);
    }

    /**
     * @Route("/addContact", name="api_contact")
     */
    public function addContact(NewUserRequest $newUserRequest, FirebaseController $firebaseController)
    {
        $verifiedSession = $firebaseController->verifyTokenId($newUserRequest->push_token(), $newUserRequest->username());
        try{
        $user = $this->apiUserRepository->findOneBy(['email' => $verifiedSession->email]);
        $contactData = $this->apiContactRepository->findBy(['phone_number' => $newUserRequest->phone_number(), 'api_user_id' => $user->getId()]);
        if (count($contactData) == 0) {
            $this->apiContactRepository->SaveContacts($user->getId(),
                $newUserRequest->name(),
                $newUserRequest->phone_number(),
                $newUserRequest->is_whatsapp());
            return new JsonResponse(['code' => 200,
                'status' => 'Contacto guardado correctamente'], Response::HTTP_OK);
        }
        return new JsonResponse(['code' => 404,
                                'status' => 'Este número ya se encontraba registrado como contacto'], Response::HTTP_NOT_FOUND);
        } catch (\Exception $exception){
            return new JsonResponse(['code' => 404,
                                    'status' => 'Hubo un error guardando este número'], Response::HTTP_NOT_FOUND);
        }
    }
    /**
     * @Route("/deleteContact", name="api_deletecontact")
     */
    public function deleteContact(NewUserRequest $newUserRequest, FirebaseController $firebaseController):JsonResponse
    {
        $verifiedSession = $firebaseController->verifyTokenId($newUserRequest->push_token(), $newUserRequest->username());
        try {
            $user = $this->apiUserRepository->findOneBy(['email' => $verifiedSession->email]);
            $contactData = $this->apiContactRepository->findOneBy(['phone_number' => $newUserRequest->phone_number(), 'api_user_id' => $user->getId()]);
            if ($contactData) {
                $this->apiContactRepository->DeleteContacts($contactData);
                return new JsonResponse(['code' => 200,
                    'status' => 'Contacto borrado correctamente'], Response::HTTP_OK);
            }
            return new JsonResponse(['code' => 404,
                'status' => 'Este número no se encuentra disponible'], Response::HTTP_NOT_FOUND);
        } catch (\Exception $exception) {
            return new JsonResponse(['code' => 404,
                'status' => 'Hubo un error borrando este número'], Response::HTTP_NOT_FOUND);
        }
    }

    public function getContacts($id)
    {
        $contact_data = $this->apiContactRepository->findBy(['api_user_id' => $id]);
        $user = $this->apiUserRepository->findOneBy(['id' => $id]);
        $location = $this->apiUserLocation->findOneBy(['api_user_id' => $id]);
        if (count($contact_data) != 0)
        {
            $i = 0;
            foreach ($contact_data as $key => $value) {
                if ($location !== null){
                    $locationValue = $location->getStreet();
                } else {
                    $locationValue = false;
                }
                $contacts_data[$i] = [
                    'name' => $value->getName(),
                    'phone_number' => $value->getPhoneNumber(),
                    'message' => $user->getMessage(),
                    'location' => $locationValue,
                ];
                $i++;
            }
        } else {
            $contacts_data = null;
        }
        return json_encode($contacts_data, JSON_OBJECT_AS_ARRAY);
    }
}
