import { Component } from '@angular/core';
import {NavController, MenuController, LoadingController, AlertController} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Geolocation } from '@ionic-native/geolocation';
import { SMS } from '@ionic-native/sms';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Diagnostic } from '@ionic-native/diagnostic';
import { LocationAccuracy } from '@ionic-native/location-accuracy';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public userDetails: any;
  public resposeData: any;
  public feedDataSet: any;
  public contactsData: any;
  public locationPostData: any = null;
  userPostData = {
    "user_id": "",
    "token": "",
    "username": ""
  };

  constructor(public authService: AuthServiceProvider, public navCtrl: NavController,
              private menuCtrl: MenuController, private loadctrl: LoadingController,
              private geolocation: Geolocation, private sms: SMS, public alertCtrl: AlertController,
              private androidPermissions: AndroidPermissions,
              private diagnostic: Diagnostic,
              public locationAccuracy: LocationAccuracy) {
    this.menuCtrl.enable(true);
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.userPostData = this.userDetails;
    this.feedDataSet = this.getFeed().then((success) => {
      this.getPermissions();
      this.checkLocation();
    });
    this.locationPostData = "";
  }

  checkLocation() {
    let p = this.diagnostic.isLocationAvailable();
    p.then((available) =>  {
      let data = ((available ? "available" : "not available"));
      if (data == "not available"){
        this.locationAccuracy.canRequest().then((canRequest: boolean) => {
          if(canRequest) {
            // the accuracy option will be ignored by iOS
            this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(async (result) => {
              if(result.code == 1){
                await this.geolocation.getCurrentPosition({enableHighAccuracy: true, maximumAge: 0}).then((resp) => {
                  let zest = this.loadctrl.create({
                    content: "Enviando ubicación"
                  });
                  zest.present();
                  this.locationPostData = {
                    "lat": resp.coords.latitude,
                    "lng": resp.coords.longitude,
                    "token": this.userPostData.token
                  };
                  this.authService.postData(this.locationPostData, "updateLocation").then((result) => {
                    zest.dismiss();

                  }).catch((err) => {
                    zest.dismiss();
                    this.checkLocation();
                  })
                }).catch((error) => {
                  alert('Hubo un error enviando su ubicación');
                });
              }
            }).catch((err) => {
                this.checkLocation();
            });
          }
        })
      } else {
        this.sendLocationWiHighAccuracy().then((success) => {

        });
      }
    }).catch(function (error) {
      alert('Hubo un error leyendo su ubicación');
    });
  }

  getPermissions(){
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.SEND_SMS).
    then((result) => {
        if (result.hasPermission == false)
        {
          this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS).then(result => {
            if (result.hasPermission == false) {
              const alert = this.alertCtrl.create({
                message: 'BSafe necesita permisos de sms para enviar sus alertas',
                buttons: [
                  {
                    text: 'Ok',
                    role: 'destructive',
                    cssClass: 'secondary',
                    handler: (blah) => {
                      this.getPermissions();
                    }
                  }
                ]
              });
              alert.present();
              alert.onDidDismiss((data) => {
                this.getFeed();
                console.log(data);
              });
            }
          });
        }
      }
    ).catch((err) => {
      alert(err);
    })
  }


  sendSOSAlert() {
    this.sendLocation().then((success) => {
      let zest = this.loadctrl.create({
        content: "Enviando Alerta"
      });
      zest.present();
      this.authService.postData(this.userPostData, 'sendSOSAlert').then((result) => {
        this.resposeData = result;
        if (this.resposeData.contacts) {
          zest.dismiss();
          this.contactsData = JSON.parse(this.resposeData.contacts);
          let data = this.contactsData;
          console.log(this.contactsData);
          let eachSMS = this.sms;
          let sendSMS = [];
          let options = {
            replaceLineBreaks: false, // true to replace \n by a new line, false by default
            android: {
              intent: ''  // send SMS with the native android SMS messaging
              //intent: '' // send SMS without opening any other app
            }
          };
          data.forEach(function (item) {
            sendSMS.push(item);
            console.log(item.phone_number, item.message, item.location);
            eachSMS.send(item.phone_number, item.message + ' Me encuentro cerca de ' + item.location, options).then((result) => {
            });
          });
          alert('Su alerta SOS ha sido enviada')
        } else {
          zest.dismiss();
          alert('Usted no tiene contactos cargados para el envío');
        }
      }).catch((error) => {
        zest.dismiss();
        alert('Hubo un error enviando datos a la aplicación')
      })
      }
    ).catch((err) => {
      alert('No pudimos enviar su ubicación');
    })
  }

  async sendLocationWiHighAccuracy(){
    await this.geolocation.getCurrentPosition({enableHighAccuracy: true, maximumAge: 0}).then((resp) => {
      let zest = this.loadctrl.create({
        content: "Enviando ubicación"
      });
      zest.present();
      this.locationPostData = {
        "lat": resp.coords.latitude,
        "lng": resp.coords.longitude,
        "token": this.userPostData.token
      };
      this.authService.postData(this.locationPostData, "updateLocation").then((result) => {
        zest.dismiss();

      }).catch((err) => {
        zest.dismiss();
        this.checkLocation();
      })
    }).catch((error) => {
      alert('Hubo un error enviando su ubicación');
    });
  }

  async sendLocation() {
    let zest = this.loadctrl.create({
      content: "Enviando ubicación"
    });
    zest.present();
    await this.geolocation.getCurrentPosition().then((resp) => {
      zest.dismiss();
      this.locationPostData = {
        "lat": resp.coords.latitude,
        "lng": resp.coords.longitude,
        "token": this.userPostData.token
      };
      console.log(this.locationPostData);
      this.authService.postData(this.locationPostData, "updateLocation").then((result) => {
        zest.dismiss();
        if (result) {
          this.getFeed();
        } else {
          this.getFeed();
        }
      })
    }).catch((error) => {
      zest.dismiss();
      alert('Hubo un error enviando su ubicación');
    });
  }

  async getFeed() {
    let zest = this.loadctrl.create({
      content: "Obteniendo datos"
    });
    zest.present();
    await this.authService.postData(this.userPostData, "getHome").then((result) => {
        this.resposeData = result;
        if (this.resposeData.feedData) {
          zest.dismiss();
          this.feedDataSet = (this.resposeData.feedData);
          this.contactsData = JSON.parse(this.resposeData.contacts);
          console.log(this.feedDataSet);
        } else {
          zest.dismiss();
          console.log("Sin acceso a la app");
        }
      }).catch((error) => {
      console.log(error);
    });
  }

}
