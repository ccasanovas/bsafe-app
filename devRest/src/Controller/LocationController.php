<?php

namespace App\Controller;

use App\Entity\ApiUser;
use App\Entity\ApiUserLocation;
use App\Validator\NewUserRequest;
use Doctrine\ORM\EntityManagerInterface;
use OpenCage\Geocoder\Geocoder;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpClient\HttpClient;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class LocationController extends AbstractController
{

    public function __construct(EntityManagerInterface $entityManager, $accessToken, $locationUrl)
    {
        $this->apiUserRepository = $entityManager->getRepository(ApiUser::class);
        $this->apiUserLocationRepository = $entityManager->getRepository(ApiUserLocation::class);
        $this->accessToken = $accessToken;
        $this->locationUrl = $locationUrl;

    }
    /**
     * @Route("/updateLocation", name="api_user_updateLocation")
     */
    public function updateLocation(NewUserRequest $newUserRequest, FirebaseController $firebaseController)
    {
        $verifiedToken = $firebaseController->verifyTokenId($newUserRequest->push_token(), $newUserRequest->username());
        try {
            $user = $this->apiUserRepository->findOneBy(['email' => $verifiedToken->email]);
            $data = $this->locationIQGeocode($newUserRequest->lat(), $newUserRequest->lng());
            $locationSaved = $this->apiUserLocationRepository->findBy(['api_user_id' => $user->getId()]);
            if (count($locationSaved) == 0) {
                $this->apiUserLocationRepository->saveLocation($user->getId(), $data);
            } else {
                $this->apiUserLocationRepository->updateLocation($locationSaved, $data);
            }
            return new JsonResponse([
                'code' => 200,
                'status' => 'Ubicación acutalizada correctamente',
                'location' => json_encode($data)], Response::HTTP_OK);
        } catch (\Exception $e){
            return new JsonResponse([
                'code' => 404,
                'status' => 'Hubo un error actualizando la ubicación',
                'location' => json_encode($data)], Response::HTTP_NOT_FOUND);
            }
    }

    public function locationIQGeocode($lat, $lng)
    {
        $url = $this->locationUrl.'reverse.php?key='.$this->accessToken.'&lat='.$lat.'&lon='.$lng.'&format=json';
        $http = HttpClient::create();
        $data = $http->request('GET', $url);
        return $data->toArray();
    }
    /*
    public function getGeocodeLocation($lat, $lng)
    {
        $geocoder = new Geocoder('aa60dd6129574e7c90a229c582acb22e');
        $result = $geocoder->geocode($lat.",".$lng); # latitude,longitude (y,x)
        return $result['results'][0];
    }
    */
}
