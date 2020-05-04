<?php

namespace App\Repository;

use App\Entity\FeedQuote;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;
use Doctrine\ORM\EntityManagerInterface;

/**
 * @method FeedQuote|null find($id, $lockMode = null, $lockVersion = null)
 * @method FeedQuote|null findOneBy(array $criteria, array $orderBy = null)
 * @method FeedQuote[]    findAll()
 * @method FeedQuote[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class FeedQuoteRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry, EntityManagerInterface $manager)
    {
        parent::__construct($registry, FeedQuote::class);
        $this->manager = $manager;
    }

    public function saveQuote($quote, $author, $img_url)
    {
        $created_at = new \DateTime();
        $newQuote = new FeedQuote();
        $newQuote
            ->setQuote($quote)
            ->setAuthor($author)
            ->setImgUrl($img_url)
            ->setCreatedAt($created_at);
        $this->manager->persist($newQuote);
        $this->manager->flush($newQuote);
        return $newQuote;
    }

    // /**
    //  * @return FeedQuote[] Returns an array of FeedQuote objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('f')
            ->andWhere('f.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('f.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?FeedQuote
    {
        return $this->createQueryBuilder('f')
            ->andWhere('f.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
