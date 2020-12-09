import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { HttpModule } from '@angular/http';
import { HomePage } from '../pages/home/home';
import {TabsPage} from "../pages/tabs/tabs";
import {ContactsPage} from "../pages/contacts/contacts";
import {AddcontactmodalPage} from "../pages/addcontactmodal/addcontactmodal";
import {MyprofilePage} from "../pages/myprofile/myprofile";
import {EditprofilePage} from "../pages/editprofile/editprofile";
import { SMS } from '@ionic-native/sms';
import {Camera} from "@ionic-native/camera";
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import {FilePath} from "@ionic-native/file-path";
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Diagnostic } from '@ionic-native/diagnostic';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import {HTTP} from "@ionic-native/http";
import {ForgotPasswordPage} from "../pages/forgot-password/forgot-password";
import {FCM} from "@ionic-native/fcm";

// @ts-ignore
@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterPage,
    HomePage,
    TabsPage,
    ContactsPage,
    AddcontactmodalPage,
    MyprofilePage,
    EditprofilePage,
    ForgotPasswordPage
  ],
  imports: [
    BrowserModule,HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AddcontactmodalPage,
    LoginPage,
    RegisterPage,
    HomePage,
    TabsPage,
    ContactsPage,
    MyprofilePage,
    EditprofilePage,
    ForgotPasswordPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    HTTP,
    Camera,
    FileTransferObject,
    FileTransfer,
    File,
    SMS,
    Diagnostic,
    LocationAccuracy,
    AndroidPermissions,
    FilePath,
    FCM
  ]
})
export class AppModule {

}
