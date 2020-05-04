<?php
namespace App\Validator;
use http\Env\Request;
use Symfony\Component\Validator\Constraints as Assert;

class NewUserRequest implements RequestDTOInterface
{
    /**
     * @Assert\Email()
     */
    private $username;
    /**
     * @var string
     */
    private $password;
    /**
     * @var string
     */
    private $newPassword;
    /**
     * @var string
     */
    private $push_token;
    /**
     * @var int
     */
    private $user_id;
    /**
     * @var string
     */
    private $confirm_password;
    /**
     * @var string
     */
    private $name;
    /**
     * @var string
     */
    private $lat;
    /**
     * @var string
     */
    private $lng;


    private $profile_file;
    /**
     * @var string
     */
    private $avatar_url;
    /**
     * @var string
     */
    private $phone_number;
    /**
     * @var string
     */
    private $message;
    /**
     * @var string
     */
    private $oobCode;
    /**
     * @var boolean
     */
    private $is_whatsapp;
    /**
     * @var boolean
     */
    private $send_location;

    public function __construct($request)
    {

        $data = json_decode($request->getContent(), true);
        $this->username = $data['username'] ?? '';
        $this->password = $data['password'] ?? '';
        $this->confirm_password = $data['confirm_password'] ?? '';
        $this->push_token = $data['token'] ?? '';
        $this->user_id = $data['user_id'] ?? '';
        $this->name = $data['name'] ?? '';
        $this->phone_number = $data['phone_number'] ?? '';
        $this->newPassword = $data['newPassword'] ?? '';
        $this->message = $data['message'] ?? '';
        $this->lat = $data['lat'] ?? '';
        $this->lng = $data['lng'] ?? '';
        $this->is_whatsapp = $data['is_whatsapp'] ?? '';
        $this->send_location = $data['send_location'] ?? '';
        $this->avatar_url = $data['avatar_url'] ?? '';
        $this->profile_file = $request ?? '';
        $this->oobCode = $request ?? '';

    }

    public function username(): string
    {
        return $this->username;
    }

    public function lat()
    {
        return $this->lat;
    }

    public function lng()
    {
        return $this->lng;
    }

    public function password()
    {
        return $this->password;
    }

    public function confirm_password()
    {
        return $this->confirm_password;
    }
    public function newPassword()
    {
        return $this->newPassword;
    }

    public function push_token()
    {
        return $this->push_token;
    }

    public function user_id()
    {
        return $this->user_id;
    }
    public function name()
    {
        return $this->name;
    }
    public function phone_number()
    {
        return $this->phone_number;
    }
    public function message()
    {
        return $this->message;
    }
    public function is_whatsapp()
    {
        return $this->is_whatsapp;
    }
    public function send_location()
    {
        return $this->send_location;
    }
    public function avatar_url()
    {
        return $this->avatar_url;
    }
    public function profile_file()
    {
        return $this->profile_file;
    }
    public function oobCode()
    {
        return $this->oobCode;
    }
}
