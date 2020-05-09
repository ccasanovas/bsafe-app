<?php

namespace App\Controller;

use App\Entity\ApiUser;
use App\Entity\ApiUserLocation;
use App\Entity\ApiUserPushTokens;
use App\Entity\FeedQuote;
use App\Form\forgotPasswordFormType;
use App\Validator\NewUserRequest;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Test\FormBuilderInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
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
     * @Route("/getForgotPassword/{email}/{password}", name="api_user_getPasswordForgotAction")
     */
    public function createNewPassword($email, $password)
    {
        try {
            $entityUser = $this->apiUserRepository->findBy(['email' => $email]);
            if ($entityUser) {
                return $this->render('forgot.html.twig',
                    ['email' => $email,
                        'password' => $password]);
            }
        } catch (\Exception $e){
            return $this->render('error.html.twig');
        }
        return $this->render('error.html.twig',
            ['email' => $email,
                'password' => $password]);
    }

    /**
     * @Route("/formForgotPassword", name="api_user_formForgotPassword")
     */
    public function formForgotPassword(Request $request,
                                       FirebaseController $firebaseController,
                                       ApiUserController $apiUserController)
    {
        try {
            $email = $request->get('email');
            $password = $request->get('password');
            $newPassword = $request->get('newPassword');
            $entityUser = $this->apiUserRepository->findOneBy(['email' => $email]);
            if ($entityUser) {
                $signIn = $firebaseController->loginToken($email, $password);
                $entityToken = $this->apiUserPushRepository->findOneBy(['api_user_id' => $entityUser->getId()]);
                $firebaseController->changeUserPassword($email, $newPassword, $signIn->accessToken());
                $this->apiUserPushRepository->updatePushTokens($signIn->refreshToken(), $entityToken);
                $this->apiUserRepository->updateApiUserPassword($entityUser, $apiUserController->generateUid($newPassword));
                return $this->render('success.html.twig');

            }
        } catch (\Exception $e) {
            return $this->render('error.html.twig');
        }
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('task', TextType::class)
            ->add('dueDate', DateType::class)
            ->add('save', SubmitType::class)
        ;
    }




}
