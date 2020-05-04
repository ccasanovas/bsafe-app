<?php

namespace App\Repository;

use App\Entity\ApiUser;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;
use Doctrine\ORM\EntityManagerInterface;

/**
 * @method ApiUser|null find($id, $lockMode = null, $lockVersion = null)
 * @method ApiUser|null findOneBy(array $criteria, array $orderBy = null)
 * @method ApiUser[]    findAll()
 * @method ApiUser[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ApiUserRepository extends ServiceEntityRepository
{
    private $manager;

    public function __construct(ManagerRegistry $registry, EntityManagerInterface $manager)
    {
        parent::__construct($registry, ApiUser::class);
        $this->manager = $manager;

    }

    public function SaveUsers($email, $password, $functional_unit_id=null)
    {
        $created_at = new \DateTime();
        $newUsers = new ApiUser();
        $newUsers
            ->setEmail($email)
            ->setPassword($password)
            ->setCreatedAt($created_at)
            ->setAvatarUrl('avatar.png')
            ->setSendLocation(0)
            ->setIsActive(1);
        $this->manager->persist($newUsers);
        $this->manager->flush($newUsers);
        return $newUsers;
    }

    public function updateApiUserPassword(ApiUser $user, $password): ApiUser
    {
        $user->setPassword($password);
        $modified_at = new \DateTime();
        $user->setModifiedAt($modified_at);
        $this->manager->persist($user);
        $this->manager->flush();
        return $user;
    }

    public function updateApiUserMessage(ApiUser $user, $message, $send_location): ApiUser
    {
        $user->setMessage($message);
        $modified_at = new \DateTime();
        $user->setModifiedAt($modified_at);
        $user->setSendLocation($send_location['isChecked']);
        $this->manager->persist($user);
        $this->manager->flush();
        return $user;
    }

    public function updateApiUserAvatarUrl(ApiUser $user, $avatar_url)
    {
        $modified_at = new \DateTime();
        $user->setModifiedAt($modified_at);
        $user->setAvatarUrl($avatar_url);
        $this->manager->persist($user);
        $this->manager->flush();
        return $user;
    }

    public function removeUsers(ApiUser $user)
    {
        $this->manager->remove($user);
        $this->manager->flush();
        return $user;
    }

    // /**
    //  * @return ApiUser[] Returns an array of ApiUser objects
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
    public function findOneBySomeField($value): ?ApiUser
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
    # 	/home/u295875505/public_html/symfony/public/

}
