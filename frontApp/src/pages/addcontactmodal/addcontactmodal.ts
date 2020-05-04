import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
  ViewController,
  MenuController,
  AlertController, LoadingController
} from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";

@IonicPage()
@Component({
  selector: 'page-addcontactmodal',
  templateUrl: 'addcontactmodal.html',
})
export class AddcontactmodalPage {

  public userDetails : any;
  public is_whatsapp = { isChecked: false };

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public modalCtrl: ModalController, public viewCtrl: ViewController,
              public authService:AuthServiceProvider, private menuCtrl: MenuController,
              public alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    this.menuCtrl.enable(false);

  }
  responseData : any;
  userPostData = {"name": "","phone_number": "",
    "token": this.navParams.get('token'), 'is_whatsapp' : this.is_whatsapp, "username": this.navParams.get('username')  };

  showalertinfo(){
    let alert = this.alertCtrl.create({
      title:"Notification",
      subTitle:"Hubo un error con la información ingresada",
      buttons:["OK"]
    });
    alert.present();
  }

  showalertconnect(){
    let alert = this.alertCtrl.create({
      title:"Notification",
      subTitle:"Ha fallado la conexión",
      buttons:["OK"]
    });
    alert.present();
  }

  sendContactData() {
    let loader = this.loadingCtrl.create({
      content: "Guardando contacto"
    });
    loader.present();
    if (this.userPostData.phone_number.length < 11 ) {
      if (this.userPostData.phone_number.length > 9){
        if (this.userPostData.name && this.userPostData.phone_number
          && this.userPostData.token) {
          //Api connections
          this.authService.postData(this.userPostData, "addContact").then((result) => {
            loader.dismiss();
            this.responseData = result;
            if (this.responseData.code == 200){
              console.log(this.responseData);
              this.dismissModal();
            }
          }).catch((err) => {
            loader.dismiss();
            if (err.status == 404) {
              let message = JSON.parse(err.error);
              this.showalertData(message.status);
            }
          });
        } else {
          loader.dismiss();
          this.showalertinfo();
        }
      } else {
        loader.dismiss();
        this.showalertData('El número de teléfono debería tener 10 dígitos, código de área y número de teléfono sin 0 y sin 15. Ejemplo: 2235468978 (mar del plata)');
      }
    } else {
      loader.dismiss();
      this.showalertData('El número de teléfono debería tener 10 dígitos, código de área y número de teléfono sin 0 y sin 15. Ejemplo: 2235468978 (mar del plata)');
    }
  }

  showalertData(data){
    let alert = this.alertCtrl.create({
      title:"Notificación",
      subTitle: data,
      buttons:["OK"]
    });
    alert.present();
  }

  dismissModal(){
    let result= "cerrando modal";
    this.viewCtrl.dismiss(result);
  }
}
