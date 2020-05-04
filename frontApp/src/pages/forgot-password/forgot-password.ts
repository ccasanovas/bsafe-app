import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, MenuController, NavController, NavParams} from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {RegisterPage} from "../register/register";
import {LoginPage} from "../login/login";

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
  resposeData: any;
  userPostData = {"username": ""};

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private menuCtrl: MenuController, public authService: AuthServiceProvider,
              public alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    this.menuCtrl.enable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

  onlogin(){
    this.navCtrl.pop();
  }

  forgotPassword() {
    let loader = this.loadingCtrl.create({
      content: "Enviando solicitud"
    });
    loader.present();
    if (this.userPostData) {
      this.authService.postData(this.userPostData, "forgotPassword").then((result) => {
        loader.dismiss();
        this.resposeData = result;
        console.log(this.resposeData);
        if (this.resposeData.code == 200 ) {
          this.showalertData(this.resposeData.status);
        } else {
          loader.dismiss();
          this.showalertData(this.resposeData.status);
        }
      }).catch((err) => {
        loader.dismiss();
        if (err.status == 404) {
          let message = JSON.parse(err.error);
          this.showalertData(message.status);
        } else {
          this.showalertEmail();
        }
      });
    } else {
      loader.dismiss();
      //this.presentToast("Give username and password");
      this.showalertEmail();
    }
  }

  showalertData(data) {
    let alert = this.alertCtrl.create({
      title: "Notificación",
      subTitle: data,
      buttons: ["OK"]
    });
    alert.present();
  }
  showalertEmail(){
    let alert = this.alertCtrl.create({
      title:"Notificación",
      subTitle:"Verifique que el email utilizado sea un email válido",
      buttons:["OK"]
    });
    alert.present();
  }
  showalertinfo() {
    let alert = this.alertCtrl.create({
      title: "Notification",
      subTitle: "Verifique que su password y usuario coincidan con los creados",
      buttons: ["OK"]
    });
    alert.present();
  }
  showalert(data){
    let alert = this.alertCtrl.create({
      title:"Notificación",
      subTitle: data,
      buttons:["OK"]
    });
    alert.present();
  }
  onregister() {
    this.navCtrl.push(RegisterPage);
  }
  onloginroot(){
    this.navCtrl.setRoot(LoginPage);
  }
}
