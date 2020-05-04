<?php

namespace App\Repository;

use App\Entity\ApiUserPushTokens;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;
use Doctrine\ORM\EntityManagerInterface;

/**
 * @method ApiUserPushTokens|null find($id, $lockMode = null, $lockVersion = null)
 * @method ApiUserPushTokens|null findOneBy(array $criteria, array $orderBy = null)
 * @method ApiUserPushTokens[]    findAll()
 * @method ApiUserPushTokens[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ApiUserPushTokensRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry, EntityManagerInterface $manager)
    {
        parent::__construct($registry, ApiUserPushTokens::class);
        $this->manager = $manager;

    }

    public function SavePushTokens($api_user_id, $token)
    {
        $created_at = new \DateTime();
        $newToken = new ApiUserPushTokens();
        $newToken
            ->setApiUserId($api_user_id)
            ->setFcmToken($token)
            ->setCreatedAt($created_at);
        $this->manager->persist($newToken);
        $this->manager->flush($newToken);
        return $newToken;
    }
    public function updatePushTokens($token, ApiUserPushTokens $apiUserPushTokens)
    {
        $apiUserPushTokens->setFcmToken($token);
    }

    public function updateUsers(Users $user, $password): Users
    {
        $email_type = "reset";
        if (empty($password))
        {
            $password = $this->generateUid($user['email']);
        }
        $user->setTempPassword($password);
        $modified_at = new \DateTime();
        $user->setModifiedAt($modified_at);
        $user->setTypeEmail($email_type);
        $this->manager->persist($user);
        $this->manager->flush();
        return $user;
    }
    // /**
    //  * @return ApiUserPushTokens[] Returns an array of ApiUserPushTokens objects
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
    public function findOneBySomeField($value): ?ApiUserPushTokens
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
