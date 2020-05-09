<?php

namespace App\Controller;

use App\Entity\ApiUser;
use App\Entity\ApiUserPushTokens;
use Doctrine\ORM\EntityManagerInterface;
use Kreait\Firebase\Auth;
use Kreait\Firebase\Exception\AuthException;
use Kreait\Firebase\Exception\FirebaseException;
use PascalDeVink\ShortUuid\ShortUuid;
use Ramsey\Uuid\Uuid;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class FirebaseController extends AbstractController
{
    public function __construct(Auth $auth, EntityManagerInterface $entityManager)
    {
        $this->auth = $auth;
        $this->apiUserPushRepository = $entityManager->getRepository(ApiUserPushTokens::class);
        $this->apiUserRepository = $entityManager->getRepository(ApiUser::class);
    }


    public function createUser($email, $password)
    {
        $this->auth->createUserWithEmailAndPassword($email, $password);
        try {
            return $this;
        } catch (\Exception $exception){
            throw  new $exception;
        }
    }

    public function refreshToken($token)
    {
        $claims = $this->getClaims($token);
        return $this->auth->signInAsUser($claims);
    }

    public function loginToken($email, $password)
    {
        return $this->auth->signInWithEmailAndPassword($email, $password);
    }

    public function GenerateUid($email)
    {
        try {
            $uuid = Uuid::uuid4();
            $shortUuid = new ShortUuid();
            $password = $shortUuid->encode($uuid);
            return $password;
        } catch (\Exception $e) {
            throw new NotFoundHttpException('Uuid no se pudo resolver!');
        }
    }

    public function retrieveRefreshToken($fcmtoken, ApiUserPushTokens $entityUser)
    {
        $refreshToken = $this->refreshToken($fcmtoken);
        $this->apiUserPushRepository->updatePushTokens($refreshToken->refreshToken(), $entityUser);
        return $refreshToken->idToken();
    }

    public function changeUserPassword($email, $password, $token)
    {
        $uid = $this->getClaims($token);
        $user = $this->verifyTokenId($token, $email);
        try {
            $this->auth->changeUserPassword($uid, $password);
            $newToken = $this->loginToken($user->email, $password);
        } catch (AuthException $e) {
            return $e;
        } catch (FirebaseException $e) {
            return $e;
        }
        return $newToken;
    }
    public function verifyTokenId($token, $email)
    {
        try {
            $verifiedIdToken = $this->auth->verifyIdToken($token);
        } catch (\InvalidArgumentException $e) {
            $userEntity = $this->apiUserRepository->findOneBy(['email' => $email]);
            $tokenEntity = $this->apiUserPushRepository->findOneBy(['api_user_id' => $userEntity->getId()]);
            $data = $this->refreshLogin($tokenEntity->getFcmToken(), $tokenEntity);
            $uid = $this->getClaims($data->idToken());
            return $this->auth->getUser($uid);
        } catch (InvalidToken $e) {
            echo 'The token could not be parsed: '. $e->getMessage();
        }
        $uid = $this->getClaims($token);
        return $this->auth->getUser($uid);
    }

    public function refreshLogin($fcmtoken, ApiUserPushTokens $entityUser)
    {
        $data = $this->auth->signInWithRefreshToken($fcmtoken);
        $refreshToken = $this->refreshToken($data->idToken());
        $this->apiUserPushRepository->updatePushTokens($refreshToken->refreshToken(), $entityUser);
        return $refreshToken;
    }

    public function forgotPassword($userEmail, $password)
    {
        $actionCodeSettings = [
            'continueUrl' => 'http://localhost:8000/getPasswordForgotAction/'.$userEmail."/".$password,
            'handleCodeInApp' => false,
            'dynamicLinkDomain' => 'bsafepanicbutton.page.link',
            'androidPackageName' => 'com.ionicframework.BSafePanicButton',
            'androidMinimumVersion' => '12',
            'androidInstallApp' => true,
        ];
        $this->auth->sendEmailActionLink('VERIFY_EMAIL',$userEmail, $actionCodeSettings);
    }

    public function getClaims($token)
    {
        $verifiedIdToken = $this->auth->verifyIdToken($token);
        return $verifiedIdToken->getClaim('sub');
    }
}
