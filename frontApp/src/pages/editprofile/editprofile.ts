import { Component } from '@angular/core';
import {
  AlertController,
  IonicPage, LoadingController,
  MenuController,
  ModalController,
  NavController,
  NavParams,
  ViewController
} from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";

/**
 * Generated class for the EditprofilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class EditprofilePage {
  public userDetails : any;
  public send_location = { isChecked: false };

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public modalCtrl: ModalController, public viewCtrl: ViewController,
              public authService:AuthServiceProvider, private menuCtrl: MenuController,
              public alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    this.menuCtrl.enable(false);
  }

  responseData : any;
  userPostDataMessage = {"message": "",
    "token": this.navParams.get('token'), "send_location": this.send_location, "username": this.navParams.get('username')};

  userPostDataPassword = {"password": "", "newPassword": "", "newConfirmPassword": "",
  "token": this.navParams.get('token'), "username": this.navParams.get('username')};

  modalChangePassword = this.navParams.get('modalPassword');
  modalChangeMessage = this.navParams.get('modalMessage');

  editMessageData(){
    let loader = this.loadingCtrl.create({
      content: "Actualizando mensaje de emergencia"
    });
    loader.present();
    if(this.userPostDataMessage.message
      && this.userPostDataMessage.token){
      //Api connections
      this.authService.postData(this.userPostDataMessage, "changeMessage").then((result) =>{
        loader.dismiss();
        this.responseData = result;
        if (this.responseData.code == 200){
        this.dismissModal();
        }
      }).catch((err) => {
        console.log(err);
        loader.dismiss();
        if (err.status == 404) {
          let message = JSON.parse(err.error);
          this.showalertData(message.status);
        } else {
          this.showalertconnect();
        }
      });
    } else {
      loader.dismiss();
      this.showalertinfo();
    }
  }

  showalertData(data){
    let alert = this.alertCtrl.create({
      title: "Notificación",
      subTitle: data,
      buttons: ["OK"]
    });
    alert.present();
  }

  editPasswordData(){
    let loader = this.loadingCtrl.create({
      content: "Actualizando contraseña"
    });
    loader.present();
    if(this.userPostDataPassword.newPassword
      == this.userPostDataPassword.newConfirmPassword
      && this.userPostDataPassword.token
      && this.userPostDataPassword.newConfirmPassword.length > 5
      && this.userPostDataPassword.newPassword.length > 5){
      //Api connections
      this.authService.postData(this.userPostDataPassword, "changePassword").then((result) =>{
        loader.dismiss();
        this.responseData = result;
        if (this.responseData.code == 200) {
          console.log(this.responseData);
          this.dismissModal();
        }
      }).catch((err) => {
        loader.dismiss();
        if (err.status == 404) {
          let message = JSON.parse(err.error);
          this.showalertData(message.status);
        } else {
          this.showalertconnect();
        }
      });
    } else {
      loader.dismiss();
      this.showalertPassword();
    }
  }

  showalertPassword()
  {
    let alert = this.alertCtrl.create({
      title:"Notificación",
      subTitle:"Verifique que su nuevo password tenga más de 5 caractéres y ambos campos coincidan",
      buttons:["OK"]
    });
    alert.present();
  }

  showalertinfo(){
    let alert = this.alertCtrl.create({
      title:"Notificación",
      subTitle:"Por favor complete su mensaje de emergencia",
      buttons:["OK"]
    });
    alert.present();
  }

  showalertconnect(){
    let alert = this.alertCtrl.create({
      title:"Notificación",
      subTitle:"Ha fallado la conexión",
      buttons:["OK"]
    });
    alert.present();
  }
  dismissModal(){
    let result= "cerrando modal";
    this.viewCtrl.dismiss(result);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditprofilePage');
  }
}
