<?php

namespace App\Controller;

use PascalDeVink\ShortUuid\ShortUuid;
use phpseclib\Crypt\Hash;
use Ramsey\Uuid\Uuid;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mime\Address;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

class MailerController extends AbstractController
{

    public function __construct(MailerInterface $mailer, $sender)
    {
        $this->sender = $sender;
        $this->mailer = $mailer;
    }

    public function sendEmail($userEmail, $link)
    {
        $url = "https://bsafe.tepongoenred.com/getForgotPassword/".$userEmail."/".$link;
        $email = (new Email());
            // email address as a simple string

            $email->from($this->sender)
                ->subject('Recuperar contraseña')
                ->to($userEmail)
                ->text('Solicitó un cambio de contraseña en su cuenta de BSafe')
                ->html("<!doctype html>
            <html lang='en-US'>

            <head>
            <meta content='text/html; charset=utf-8' http-equiv='Content-Type' />
            <title>Cambio de contraseña</title>
            <meta name='description' content='Reset Password Email Template.'>
            <style type='text/css'>
               a:hover {text-decoration: underline !important;}
            </style>
            </head>

            <body marginheight='0' topmargin='0' marginwidth='0' style='margin: 0px; background-color: #f2f3f8;' leftmargin='0'>
            <!--100% body table-->
            <table cellspacing='0' border='0' cellpadding='0' width='100%' bgcolor='#f2f3f8'
            style='@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;'>
            <tr>
            <td>
                <table style='background-color: #f2f3f8; max-width:670px;  margin:0 auto;' width='100%' border='0'
                    align='center' cellpadding='0' cellspacing='0'>
                    <tr>
                        <td style='height:80px;'>&nbsp;</td>
                    </tr>
                    <tr>
                        <td style='text-align:center;'>
                          <a title='logo' target='_blank'>
                            <img width='60' src='https://bsafe.tepongoenred.com/uploads/icon.png' title='logo' alt='logo'>
                          </a>
                        </td>
                    </tr>
                    <tr>
                        <td style='height:20px;'>&nbsp;</td>
                    </tr>
                    <tr>
                        <td>
                            <table width='95%' border='0' align='center' cellpadding='0' cellspacing='0'
                                style='max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);'>
                                <tr>
                                    <td style='height:40px;'>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style='padding:0 35px;'>
                                        <h1 style='color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;'>Ha solicitado
                                         un cambio de contraseña</h1>
                                        <span
                                            style='display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;'></span>
                                        <p style='color:#455056; font-size:15px;line-height:24px; margin:0;'>
                                            Se le ha generado un link único para verificar su identidad al cambiar la contraseña. Para reiniciar su contraseña, haga click en el próximo botón.
                                        </p>
                                        <a href=".$url."
                                            style='background:#7f69a5;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;'>Reiniciar contraseña</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style='height:40px;'>&nbsp;</td>
                                </tr>
                            </table>
                        </td>
                    <tr>
                        <td style='height:20px;'>&nbsp;</td>
                    </tr>
                    <tr>
                        <td style='text-align:center;'>
                            <p style='font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;'>&copy; </p>
                        </td>
                    </tr>
                    <tr>
                        <td style='height:80px;'>&nbsp;</td>
                    </tr>
                </table>
            </td>
            </tr>
        </table>
        <!--/100% body table-->
        </body>

        </html>");
        try {
            $this->mailer->send($email);
        } catch (TransportExceptionInterface $e) {
            return new JsonResponse(['error' => $e->getMessage() ], Response::HTTP_NOT_FOUND);
        }
      return new Response(
          'Email was sent'
      );
    }

}
