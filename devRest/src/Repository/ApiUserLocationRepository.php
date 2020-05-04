<?php

namespace App\Repository;

use App\Entity\ApiUserLocation;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;
use Doctrine\ORM\EntityManagerInterface;

/**
 * @method ApiUserLocation|null find($id, $lockMode = null, $lockVersion = null)
 * @method ApiUserLocation|null findOneBy(array $criteria, array $orderBy = null)
 * @method ApiUserLocation[]    findAll()
 * @method ApiUserLocation[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ApiUserLocationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry, EntityManagerInterface $manager)
    {
        parent::__construct($registry, ApiUserLocation::class);
        $this->manager = $manager;
    }

    public function saveLocation($api_user_id, $data)
    {
        $modified_at = new \DateTime();
        $newLocation = new ApiUserLocation();
        $newLocation
            ->setApiUserId($api_user_id)
            ->setAddress($data['display_name'])
            ->setCity($data['address']['city'])
            ->setCountry($data['address']['country'])
            ->setStreet($data['display_name'])
            ->setProvince($data['address']['state'])
            ->setModifiedAt($modified_at);
        $this->manager->persist($newLocation);
        $this->manager->flush($newLocation);
        return $newLocation;
    }

    public function updateLocation(ApiUserLocation $location, $data): ApiUserLocation
    {
        $modified_at = new \DateTime();
        $location
            ->setAddress($data['display_name'])
            ->setCity($data['address']['city'])
            ->setCountry($data['address']['country'])
            ->setStreet($data['display_name'])
            ->setProvince($data['address']['state'])
            ->setModifiedAt($modified_at);
        $this->manager->persist($location);
        $this->manager->flush();
        return $location;
    }

    // /**
    //  * @return ApiUserLocation[] Returns an array of ApiUserLocation objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('a.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?ApiUserLocation
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
