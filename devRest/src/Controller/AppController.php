<?php

namespace App\Controller;

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

class AppController extends AbstractController
{
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->apiUserRepository = $entityManager->getRepository(ApiUser::class);
        $this->apiUserPushRepository = $entityManager->getRepository(ApiUserPushTokens::class);
        $this->feedQuoteRepository = $entityManager->getRepository(FeedQuote::class);
        $this->apiUserLocation = $entityManager->getRepository(ApiUserLocation::class);
    }
    /**
     * @Route("/getHome", name="api_user_home")
     */
    public function getHome(NewUserRequest $newUserRequest,
                            FirebaseController $firebaseController,
                            ApiContactController $apiContactController,
                            ApiUserController $apiUserController)
    {
        $userFirebase = $firebaseController->verifyTokenId($newUserRequest->push_token(), $newUserRequest->username());
        try {
                $user = $this->apiUserRepository->findOneBy(['email' => $userFirebase->email]);
                $entityToken = $this->apiUserPushRepository->findOneBy(['api_user_id' => $user->getId()]);
                $fireBaseUser = $firebaseController->refreshLogin($entityToken->getFcmToken(), $entityToken);
                $this->apiUserPushRepository->updatePushTokens($fireBaseUser->refreshToken(), $entityToken);
                $data = [
                    'code' => 200,
                    'status' => 'Datos obtenidos correctamente',
                    'feedData' => $this->getQuote(),
                    'contactData' => $apiUserController->getUserDetails($user->getId()),
                    'contacts' => $apiContactController->getContacts($user->getId()),
                    'user_id' => $user->getId(),
                    'token' => $fireBaseUser->idToken()];
                return new JsonResponse($data, 200);
        }  catch (\Exception $exception) {
            return new JsonResponse(['Error' => $exception], Response::HTTP_FOUND);
        }
    }

    /**
     * @Route("/sendSOSAlert", name="api_user_sosAlert")
     */
    public function sendSOSAlert(NewUserRequest $newUserRequest, FirebaseController $firebaseController,
                                ApiContactController $apiContactController)
    {
        $userFirebase = $firebaseController->verifyTokenId($newUserRequest->push_token(), $newUserRequest->username());
        if ($userFirebase){
            $user = $this->apiUserRepository->findOneBy(['email' => $userFirebase->email]);
            $entityToken = $this->apiUserPushRepository->findOneBy(['api_user_id' => $user->getId()]);
            $fireBaseUser = $firebaseController->refreshLogin($entityToken->getFcmToken(), $entityToken);
            if ($user->getSendLocation()){
                $location = $this->apiUserLocation->findOneBy(['api_user_id' => $user->getId()]);
                $data = [
                    'feedData' => $this->getQuote(),
                    'contacts' => $apiContactController->getContacts($user->getId()),
                    'token' => $fireBaseUser->idToken(),
                    'location' => $location->getStreet()];
                return new JsonResponse($data, Response::HTTP_OK);
            }
            $data = [
                'feedData' => $this->getQuote(),
                'contacts' => $apiContactController->getContacts($user->getId()),
                'token' => $fireBaseUser,
                'location' => ''];
            return new JsonResponse($data, Response::HTTP_OK);
        }
    }

    public function getQuote()
    {
        $randQuote = $this->feedQuoteRepository->find(1);
        return ['author' => $randQuote->getAuthor(), 'quote' => $randQuote->getQuote() ];
    }

    /**
     * @Route("/addQuote", name="api_user_quote")
     */
    public function addQuote(NewUserRequest $newUserRequest)
    {
        return $this->feedQuoteRepository->saveQuote($newUserRequest->confirm_password(), $newUserRequest->name(), $newUserRequest->password());
    }

    /**
     * @Route("/uploads/{id}", name="api_user_avatar_url", methods={"GET"})
     */
    public function imageAction($id) {
        return $this->render('base.html.twig', ['image' => $id]);
    }

    /**
     * @Route("/getPasswordForgotAction/{email}/{password}", name="api_user_getPasswordForgotAction", methods={"GET"})
     */
    public function createNewPassword($email, $password, FirebaseController $firebaseController)
    {
        return new JsonResponse(['status' => 'ok']);
    }
}
