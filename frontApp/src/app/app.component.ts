import { Component, ViewChild } from '@angular/core';
import {Platform, Nav, LoadingController, AlertController} from 'ionic-angular';
import { LoginPage } from '../pages/login/login';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {AuthServiceProvider} from "../providers/auth-service/auth-service";

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  public userDetails: any;

  rootPage: any = LoginPage;
  resposeData: any;
  userPostData = {
    "token": "",
    "username": ""
  };


  constructor(platform: Platform, public SplashScreen: SplashScreen,
              public StatusBar: StatusBar, public loadingCtrl: LoadingController,
              public alertCtrl: AlertController, public authService: AuthServiceProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      const data = JSON.parse(localStorage.getItem('userData'));
      if (data.userData.token != null) {
        this.userDetails = data.userData;
        this.userPostData = this.userDetails;
        this.autoLogin();
      }
      this.StatusBar.styleDefault();
      this.SplashScreen.hide();
    });
  }

  autoLogin() {
    let loader = this.loadingCtrl.create({
      content: "Iniciando sesión"
    });
    loader.present();
    this.authService.postData(this.userPostData, "autoLogin").then((result) => {
        loader.dismiss();
        this.resposeData = result;
        console.log(this.resposeData);
        if (this.resposeData.code == 200) {
          localStorage.setItem('userData', JSON.stringify(this.resposeData));
          this.nav.setRoot(TabsPage);
        } else {
          loader.dismiss();
          this.showalertData(this.resposeData.status);
        }
        }, (err) => {
        loader.dismiss();
        this.showalertconnect();
        //Connection failed message
    });
  }

  showalertconnect(){
    let alert = this.alertCtrl.create({
      title: "Notificación",
      subTitle: "Se encuentra sin conexión a la app",
      buttons: ["OK"]
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

  onclickHome(){
    this.nav.setRoot(TabsPage);
  }

  onclickadd(){
    this.nav.setRoot(HomePage);
  }

  onclicklogout(){
    this.nav.setRoot(LoginPage);
  }
}
