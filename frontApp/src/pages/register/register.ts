import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import {TabsPage} from "../tabs/tabs";
import {ForgotPasswordPage} from "../forgot-password/forgot-password";

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  responseData : any;
  userData = {"username": "","password": "", "confirm_password": ""};

  constructor(public authService:AuthServiceProvider, public navCtrl: NavController,
              public navParams: NavParams, private menuCtrl: MenuController,
              public alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    this.menuCtrl.enable(false);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  onlogin(){
    this.navCtrl.pop();
  }

  showalertDatainfo(){
    let alert = this.alertCtrl.create({
      title:"Notificación",
      subTitle:"Verifique la información ingresada, la contraseña debería tener más de 5 carácteres y coincidir con la confirmación de contraseña",
      buttons:["OK"]
    });
    alert.present();
  }

  showalertData(data){
    let alert = this.alertCtrl.create({
      title:"Notificación",
      subTitle: data,
      buttons:["OK"]
    });
    alert.present();
  }


  showalertEmail(){
    let alert = this.alertCtrl.create({
      title:"Notificación",
      subTitle:"Ha fallado en la creación del usuario. Verifique su usuario sea un email válido",
      buttons:["OK"]
    });
    alert.present();
  }

  signup() {
    let loader = this.loadingCtrl.create({
      content: "Creando cuenta de usuario"
    });
    loader.present();
      if (this.userData.username &&
        this.userData.password.length > 5 &&
        this.userData.confirm_password.length > 5 &&
        this.userData.password == this.userData.confirm_password) {
        //Api connections
        this.authService.postData(this.userData, "signUp").then((result) => {
          loader.dismiss();
          this.responseData = result;
          console.log(this.responseData);
          if (this.responseData.code == 200) {
            localStorage.setItem('userData', JSON.stringify(this.responseData));
            this.navCtrl.setRoot(TabsPage);
          } else {
            loader.dismiss();
            localStorage.setItem('userData', JSON.stringify(this.responseData));
            this.navCtrl.setRoot(TabsPage);
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
        this.showalertDatainfo();
      }

  }

  onforgot() {
    this.navCtrl.push(ForgotPasswordPage);
  }
}
