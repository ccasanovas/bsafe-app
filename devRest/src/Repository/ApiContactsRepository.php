<?php

namespace App\Repository;

use App\Entity\ApiContacts;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;
use Doctrine\ORM\EntityManagerInterface;

/**
 * @method ApiContacts|null find($id, $lockMode = null, $lockVersion = null)
 * @method ApiContacts|null findOneBy(array $criteria, array $orderBy = null)
 * @method ApiContacts[]    findAll()
 * @method ApiContacts[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ApiContactsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry, EntityManagerInterface $manager)
    {
        parent::__construct($registry, ApiContacts::class);
        $this->manager = $manager;
    }

    public function SaveContacts($api_user_id, $name, $phone_number, $is_whatsapp)
    {
        $newContact = new ApiContacts();
        $newContact
            ->setApiUserId($api_user_id)
            ->setName($name)
            ->setPhoneNumber($phone_number)
            ->setIsActive(1)
            ->setIsWhatsapp($is_whatsapp['isChecked']);
        $this->manager->persist($newContact);
        $this->manager->flush($newContact);
        return $newContact;
    }

    public function DeleteContacts($phone_number)
    {

        $this->manager->remove($phone_number);
        $this->manager->flush($phone_number);
        return $this;
    }

    // /**
    //  * @return ApiContacts[] Returns an array of ApiContacts objects
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
    public function findOneBySomeField($value): ?ApiContacts
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
