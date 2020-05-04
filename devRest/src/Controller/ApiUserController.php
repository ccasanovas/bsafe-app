<?php

namespace App\Controller;

use App\Entity\ApiContacts;
use App\Entity\ApiUser;
use App\Entity\ApiUserLocation;
use App\Entity\ApiUserPushTokens;
use App\Entity\FeedQuote;
use App\Validator\NewUserRequest;
use Doctrine\ORM\EntityManagerInterface;
use GuzzleHttp\Psr7\UploadedFile;
use Ramsey\Uuid\Uuid;
use PascalDeVink\ShortUuid\ShortUuid;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;

class ApiUserController extends AbstractController
{
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->apiUserRepository = $entityManager->getRepository(ApiUser::class);
        $this->apiUserPushRepository = $entityManager->getRepository(ApiUserPushTokens::class);
        $this->apiContactRepository = $entityManager->getRepository(ApiContacts::class);
        $this->feedQuoteRepository = $entityManager->getRepository(FeedQuote::class);
        $this->apiUserLocationRepository = $entityManager->getRepository(ApiUserLocation::class);
    }

    /**
     * @Route("/signUp", name="api_user_signup")
     */
    public function signUp(NewUserRequest $newUserRequest, FirebaseController $firebaseController): JsonResponse
    {
        try {
            $user = $this->apiUserRepository->findOneBy(['email' => $newUserRequest->username()]);
            if (!$user) {
                $user = $this->apiUserRepository->SaveUsers($newUserRequest->username(), $newUserRequest->password());
                $firebaseController->createUser($newUserRequest->username(), $newUserRequest->password());
                $token = $firebaseController->loginToken($newUserRequest->username(), $newUserRequest->password());
                $this->apiUserPushRepository->SavePushTokens($user->getId(), $token->refreshToken());
                return new JsonResponse([
                    'code' => 200,
                    'status' => 'Usuario registrado con éxito',
                    'userData' =>
                    ['token' => $token->idToken(),
                        'username' => $user->getEmail()
                    ],
                ], Response::HTTP_OK);
            } else {
                return new JsonResponse(['code' => 404,
                    'status' => 'El usuario se encuentra registrado previamente'], Response::HTTP_NOT_FOUND);
            }
        } catch (\Exception $exception){
            return new JsonResponse([
                'code' => 404,
                'status' => 'El usuario se encuentra registrado previamente'], Response::HTTP_NOT_FOUND);
            }
    }

    /**
     * @Route("/login", name="api_user_login")
     */
    public function login(NewUserRequest $newUserRequest, FirebaseController $firebaseController)
    {
        $user = $this->apiUserRepository->findOneBy(['email' => $newUserRequest->username(), 'password' => $newUserRequest->password()]);
        if ($user) {
            try {
                $token = $this->apiUserPushRepository->findOneBy(['api_user_id' => $user->getId()]);
                $signIn = $firebaseController->loginToken($newUserRequest->username(), $newUserRequest->password());
                $this->apiUserPushRepository->updatePushTokens($signIn->refreshToken(), $token);
                    return new JsonResponse(
                        [   'code' => 200,
                            'status' => 'Usuario logueado correctamente',
                            'userData' =>
                            [   'token' => $signIn->idToken(),
                                'username' => $user->getEmail()]], Response::HTTP_OK);
            } catch (\Exception $exception) {
                return new JsonResponse(['code' => 404,
                                        'status' => 'Hubo un problema iniciando sesión'], Response::HTTP_NOT_FOUND);
            }
        }
        return new JsonResponse(['code' => 404,
            'status' => 'El usuario o la contraseña ingresadas con incorrectas'], Response::HTTP_NOT_FOUND);
    }

    /**
     * @Route("/autoLogin", name="api_user_autoLogin")
     */
    public function autoLogin(NewUserRequest $newUserRequest, FirebaseController $firebaseController)
    {
        $userFirebase = $firebaseController->verifyTokenId($newUserRequest->push_token(), $newUserRequest->username());
        try {
            $user = $this->apiUserRepository->findOneBy(['email' => $userFirebase->email]);
            $token = $this->apiUserPushRepository->findOneBy(['api_user_id' => $user->getId()]);
            $fireBaseUser = $firebaseController->refreshLogin($token->getFcmToken(), $token);
        } catch (\Exception $exception) {
            return new JsonResponse([
                'code' => 404,
                'status' => 'No se pudo encontrar el usuario registrado'], Response::HTTP_NOT_FOUND);
        }
        return new JsonResponse(
            [
                'code' => 200,
                'status' => 'Usuario logueado correctamente',
                'userData' =>
                [   'token' => $fireBaseUser->idToken(),
                    'username' => $user->getEmail()]], Response::HTTP_OK);
    }

    /**
     * @Route("/changePassword", name="api_user_changePassword")
     */
    public function changePassword(NewUserRequest $newUserRequest, FirebaseController $firebaseController)
    {
        $verifiedToken= $firebaseController->verifyTokenId($newUserRequest->push_token(), $newUserRequest->username());
        try {
            $user = $this->apiUserRepository->findOneBy(['email' => $verifiedToken->email]);
            $entityToken = $this->apiUserPushRepository->findOneBy(['api_user_id' => $user->getId()]);
            $token = $firebaseController->changeUserPassword($user->getEmail(), $newUserRequest->newPassword(), $newUserRequest->push_token());
            $this->apiUserPushRepository->updatePushTokens($token->refreshToken(), $entityToken);
            $this->apiUserRepository->updateApiUserPassword($user, $newUserRequest->newPassword());
            return new JsonResponse([
                'code' => 200,
                'status' => 'Password editado exitosamente',
                'contactData' => $this->getUserDetails($user->getId()),
                'token' => $token->idToken(),
                'user_id' => $newUserRequest->user_id()], Response::HTTP_OK);
        } catch (\Exception $exception){
            return new JsonResponse([
                'code' => 404,
                'status' => 'Hubo un error editando el password'], Response::HTTP_NOT_FOUND);
        }
    }

    /**
     * @Route("/changeMessage", name="api_user_changeMessage")
     */
    public function changeMessage(NewUserRequest $newUserRequest, FirebaseController $firebaseController)
    {
        $verifiedToken= $firebaseController->verifyTokenId($newUserRequest->push_token(), $newUserRequest->username());
        try {
        $user = $this->apiUserRepository->findOneBy(['email' => $verifiedToken->email]);
        $this->apiUserRepository->updateApiUserMessage($user, $newUserRequest->message(), $newUserRequest->send_location());
        return new JsonResponse([
            'code' => 200,
            'status' => 'Mensaje de emergencia editado correctamente',
            'contactData' => $this->getUserDetails($user->getId()),
            'token' => $newUserRequest->push_token(),
            'user_id' => $newUserRequest->user_id()], Response::HTTP_OK);
        } catch (\Exception $e){
            return new JsonResponse([
                'code' => 404,
                'status' => 'Hubo un error editando su mensaje de emergencia',
               ], Response::HTTP_NOT_FOUND);
        }
    }

    public function getUserDetails($userId)
    {
        $profileDataUser = $this->apiUserRepository->findOneBy(['id' => $userId]);
        return ['username' => $profileDataUser->getEmail(), 'avatar' => $profileDataUser->getAvatarUrl()];
    }

    /**
     * @Route("/uploadAvatarUrl", name="api_user_uploadAvatarUrl")
     */
    public function uploadAvatarUrl(Request $newUserRequest, FirebaseController $firebaseController)
    {
        $data = $newUserRequest->headers->get('token');
        $verifiedToken = $firebaseController->verifyTokenId($data, $newUserRequest->headers->get('username'));
        try {
            /** @var UploadedFile $uploadedFile */
            $uploadedFile = $newUserRequest->files->get('file');
            $destination = $this->getParameter('kernel.project_dir').'/public/uploads';
            $originalName = pathinfo($uploadedFile->getClientOriginalName(), PATHINFO_FILENAME);
            $newFileName = $originalName . '-' . uniqid() . '.' . $uploadedFile->guessExtension();
            $user = $this->apiUserRepository->findOneBy(['email' => $verifiedToken->email]);
            $this->apiUserRepository->updateApiUserAvatarUrl($user, $newFileName);
            dd($uploadedFile->move($destination, $newFileName));
            $uploadedFile->set(null);
            return new JsonResponse([
                'code' => 200,
                'status' => 'Imagen subida correctamente'], Response::HTTP_OK);
        } catch (\Exception $e){
            return  new JsonResponse([
                'code' => 404,
                'status' => 'Hubo un error subiendo la imagen'], RESPONSE::HTTP_NOT_FOUND);
        }
    }

    /**
     * @Route("/forgotPassword", name="api_user_forgotPassword")
     */
    public function forgotPassword(NewUserRequest $newUserRequest,
                           MailerController $mailerController)
    {
        $user = $this->apiUserRepository->findOneBy(['email' => $newUserRequest->username()]);
        try{
        if ($user) {
            $mailerController->sendEmail($user->getEmail(), $user->getPassword());
            // $firebaseController->forgotPassword($newUserRequest->username(), $user->getPassword());
            return new JsonResponse([
                'code' => 200,
                'status' => 'Su solicitud de cambio de contraseña fue enviado con éxito. Verifique su casilla
                de email para continuar',
            ], Response::HTTP_OK);
        }
        } catch (\Exception $e){
            return new JsonResponse([
                'code' => 404,
                'status' => 'Hubo un error solicitando su cambio de contraseña',
            ], Response::HTTP_NOT_FOUND);
        }
        return new JsonResponse([
            'code' => 404,
            'status' => 'Su usuario no se encuentra registrado',
        ], Response::HTTP_NOT_FOUND);
    }

}
