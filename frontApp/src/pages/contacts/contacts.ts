import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { AlertController, ModalController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { AddcontactmodalPage} from "../addcontactmodal/addcontactmodal";

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'contacts.html',
})
export class ContactsPage {

  public userDetails : any;
  public resposeData : any;
  public dataSet : any;
  public feedDataSet: any;
  public contactsData: any;

  userPostData = {
    "user_id": "",
    "token": "",
    "username": ""
  };

  deleteData = {
    "phone_number": "",
    "user_id": "",
    "token": "",
    "username": ""
  };


  constructor(public authService:AuthServiceProvider, public modalCtrl:ModalController, public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController, public alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    this.menuCtrl.enable(false);
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.userPostData = this.userDetails;
    this.getFeed();
  }


  async presentModal() {
    let modal= this.modalCtrl.create(AddcontactmodalPage, {user_id: this.userPostData.user_id,
    token: this.userPostData.token, username: this.userPostData.username});
    modal.present();
    modal.onDidDismiss((data)=>{
      this.getFeed();
      console.log(data);
    })
  }

  getFeed() {
    let zest = this.loadingCtrl.create({
      content: "Obteniendo datos"
    });
    zest.present();
    this.authService.postData(this.userPostData, "getHome").then((result) => {
      zest.dismiss();
      this.resposeData = result;
      if (this.resposeData.contacts) {
        this.contactsData = JSON.parse(this.resposeData.contacts);
        this.feedDataSet = (this.resposeData.feedData);
        console.log(this.contactsData);
      } else {
        zest.dismiss();
        console.log("Sin acceso a la app");
      }
    }, (err) => {
      zest.dismiss();
      //Connection failed message
    });
  }

  async presentAlert(data) {
    this.deleteData = {
      'phone_number': data,
      'user_id': this.userDetails.user_id,
      'token': this.userDetails.token,
      'username': this.userDetails.username
    };
    const alert = await this.alertCtrl.create({

      message: 'Seguro desea borrar este número?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'destructive',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok',
          role: 'Confirm',
          handler: () => {
            this.deleteContact(this.deleteData);
            console.log(this.deleteData);
          }
        }
      ]
    });
    await alert.present();
    alert.onDidDismiss((data)=>{
      console.log(data);
    })
  }
  deleteContact(deleteData){
      let zest = this.loadingCtrl.create({
        content: "Obteniendo datos"
      });
      zest.present();
      this.authService.postData(deleteData, "deleteContact").then((result) => {
        zest.dismiss();
        this.resposeData = result;
        if (this.resposeData.code == 200) {
          this.getFeed();
        }
      }).catch((err) => {
        zest.dismiss();
        if (err.status == 404) {
          let message = JSON.parse(err.error);
          this.showalertData(message.status);
        }
        //Connection failed message
      });
  }

  showalertData(data){
    let alert = this.alertCtrl.create({
      title:"Notificación",
      subTitle: data,
      buttons:["OK"]
    });
    alert.present();
  }

  showalertinfo(){
    let alert = this.alertCtrl.create({
      title:"Notification",
      subTitle:"Verifique la información ingresada",
      buttons:["OK"]
    });
    alert.present();
  }

}
