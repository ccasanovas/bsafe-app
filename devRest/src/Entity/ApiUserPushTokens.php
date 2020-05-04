<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ApiUserPushTokensRepository")
 */
class ApiUserPushTokens
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     */
    private $api_user_id;

    /**
     * @ORM\Column(type="string", length=1500)
     */
    private $fcm_token;

    /**
     * @ORM\Column(type="datetime")
     */
    private $created_at;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getApiUserId(): ?int
    {
        return $this->api_user_id;
    }

    public function setApiUserId(int $api_user_id): self
    {
        $this->api_user_id = $api_user_id;

        return $this;
    }

    public function getFcmToken(): ?string
    {
        return $this->fcm_token;
    }

    public function setFcmToken(string $fcm_token): self
    {
        $this->fcm_token = $fcm_token;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeInterface $created_at): self
    {
        $this->created_at = $created_at;
        return $this;
    }
}
