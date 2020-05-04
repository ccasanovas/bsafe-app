<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ApiContactsRepository")
 */
class ApiContacts
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
     * @ORM\Column(type="string", length=20)
     */
    private $phone_number;

    /**
     * @ORM\Column(type="string", length=15, nullable=true)
     */
    private $name;

    /**
     * @ORM\Column(type="boolean")
     */
    private $is_active;
    /**
     * @ORM\Column(type="boolean")
     */
    private $is_whatsapp;

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

    public function getPhoneNumber(): ?string
    {
        return $this->phone_number;
    }

    public function setPhoneNumber(string $phone_number): self
    {
        $this->phone_number = $phone_number;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getIsActive(): ?bool
    {
        return $this->is_active;
    }

    public function setIsActive(bool $is_active): self
    {
        $this->is_active = $is_active;

        return $this;
    }
    public function getIsWhatsapp(): ?bool
    {
        return $this->is_whatsapp;
    }

    public function setIsWhatsapp(bool $is_whatsapp): self
    {
        $this->is_whatsapp = $is_whatsapp;

        return $this;
    }
}
