import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, MenuController, NavController, NavParams} from 'ionic-angular';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import {RegisterPage} from '../../pages/register/register';
import {TabsPage} from "../tabs/tabs";
import {ForgotPasswordPage} from "../forgot-password/forgot-password";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  resposeData: any;
  userData = {"username": "", "password": ""};

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private menuCtrl: MenuController, public authService: AuthServiceProvider,
              public alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    this.menuCtrl.enable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    let loader = this.loadingCtrl.create({
      content: "Iniciando sesión"
    });
    loader.present();
    if (this.userData.username
      && this.userData.password
      && this.userData.username.length > 5
      && this.userData.password.length > 5) {
      this.authService.postData(this.userData, "login").then((result) => {
        loader.dismiss();
        this.resposeData = result;
        console.log(this.resposeData);
        if (this.resposeData.code == 200 ) {
          localStorage.setItem('userData', JSON.stringify(this.resposeData));
          this.navCtrl.setRoot(TabsPage);
        } else {
          loader.dismiss();
          localStorage.setItem('userData', JSON.stringify(this.resposeData));
          this.navCtrl.setRoot(TabsPage);
          this.showalertData(this.resposeData.status);
        }
      }).catch((err) => {
        loader.dismiss();
        console.log(err);
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
      this.showalertFront();
    }
  }

  showalertEmail(){
      let alert = this.alertCtrl.create({
        title:"Notificación",
        subTitle:"Ha fallado en el inicio de sesión del usuario. Verifique su usuario sea un email válido",
        buttons:["OK"]
      });
      alert.present();
  }
  showalertFront() {
    let alert = this.alertCtrl.create({
      title:"Notificación",
      subTitle:"Verifique que su password tenga más de 6 carácteres y su usuario sea un email válido",
      buttons:["OK"]
    });
    alert.present();
  }

  showalertData(data) {
    let alert = this.alertCtrl.create({
      title: "Notificación",
      subTitle: data,
      buttons: ["OK"]
    });
    alert.present();
  }

  onregister() {
    this.navCtrl.push(RegisterPage);
  }

  onforgot() {
    this.navCtrl.push(ForgotPasswordPage);
  }

}
