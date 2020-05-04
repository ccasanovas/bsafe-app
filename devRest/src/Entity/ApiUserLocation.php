<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ApiUserLocationRepository")
 */
class ApiUserLocation
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
     * @ORM\Column(type="string", length=80, nullable=true)
     */
    private $country;

    /**
     * @ORM\Column(type="string", length=80, nullable=true)
     */
    private $province;

    /**
     * @ORM\Column(type="string", length=80, nullable=true)
     */
    private $city;

    /**
     * @ORM\Column(type="string", length=80, nullable=true)
     */
    private $street;

    /**
     * @ORM\Column(type="string", length=30, nullable=true)
     */
    private $postalcode;

    /**
     * @ORM\Column(type="string", length=80, nullable=true)
     */
    private $address;

    /**
     * @ORM\Column(type="datetime", length=80, nullable=true)
     */
    private $modified_at;

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

    public function getCountry(): ?string
    {
        return $this->country;
    }

    public function setCountry(?string $country): self
    {
        $this->country = $country;

        return $this;
    }

    public function getProvince(): ?string
    {
        return $this->province;
    }

    public function setProvince(?string $province): self
    {
        $this->province = $province;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(?string $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getStreet(): ?string
    {
        return $this->street;
    }

    public function setStreet(?string $street): self
    {
        $this->street = $street;

        return $this;
    }

    public function getPostalcode(): ?string
    {
        return $this->postalcode;
    }

    public function setPostalcode(?string $postalcode): self
    {
        $this->postalcode = $postalcode;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(?string $address): self
    {
        $this->address = $address;

        return $this;
    }
    public function getModifiedAt(): ?\DateTimeInterface
    {
        return $this->modified_at;
    }

    public function setModifiedAt(?\DateTimeInterface $modified_at): self
    {
        $this->modified_at = $modified_at;

        return $this;
    }
}
