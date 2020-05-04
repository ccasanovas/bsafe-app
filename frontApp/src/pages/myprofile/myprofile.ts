import {Component} from '@angular/core';
import {
  ActionSheetController, AlertController, App,
  IonicPage, Loading,
  LoadingController,
  MenuController,
  ModalController,
  NavController, Platform,
  ToastController
} from 'ionic-angular';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import {EditprofilePage} from "../editprofile/editprofile";
import {FileTransfer, FileTransferObject} from '@ionic-native/file-transfer';
import {Camera} from '@ionic-native/camera';
import {File} from "@ionic-native/file";
import {FilePath} from "@ionic-native/file-path";
import { Geolocation } from '@ionic-native/geolocation';
import {LoginPage} from "../login/login";

@IonicPage()
@Component({
  selector: 'page-myprofile',
  templateUrl: 'myprofile.html',
})

export class MyprofilePage {

  public userDetails: any;
  public resposeData: any;
  public dataSet: any;
  public feedDataSet: any;
  public contactData: any;
  public selectorModalPassword: any;
  public selectorModalMessage: any;
  userPostData = {
    "user_id": "",
    "token": "",
    "username": ""
  };
  loading: Loading;
  lastImage: string = null;

  constructor(public authService: AuthServiceProvider, public navCtrl: NavController,
              private menuCtrl: MenuController, private loadctrl: LoadingController,
              public modalCtrl: ModalController,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              private transfer: FileTransfer,
              private camera: Camera,
              public file: File,
              public actionSheetCtrl: ActionSheetController,
              public filePath: FilePath,
              public platform: Platform,
              private geolocation: Geolocation,
              public alertCtrl: AlertController,
              public app: App) {
    this.menuCtrl.enable(true);
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.userPostData = this.userDetails;
    this.contactData = this.getFeed().then((success) => {
      this.getGPSPermissions();
    });
    this.selectorModalPassword = {"modal_type": "ChangePassword"};
    this.selectorModalMessage = {"modal_type": "ChangeMessage"};
    this.lastImage = "";
  }

  getGPSPermissions()
  {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp);
    }).catch((err) => {
      const alert = this.alertCtrl.create({
        message: 'BSafe necesita permisos a su ubicación para enviarla en sus alertas',
        buttons: [
          {
            text: 'Ok',
            role: 'destructive',
            cssClass: 'secondary',
            handler: (blah) => {
              this.getGPSPermissions();
            }
          }
        ]
      });
      alert.present();
      alert.onDidDismiss((data)=>{
        console.log(data);
      });
      console.log('Error actualizando ubicación', err);
    });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  async getFeed() {
    let zest = this.loadctrl.create({
      content: "Obteniendo datos"
    });
    zest.present();
    await this.authService.postData(this.userPostData, "getHome").then((result) => {
      zest.dismiss();
      this.resposeData = result;
      if (this.resposeData.contactData) {
        this.feedDataSet = (this.resposeData.contactData);
        console.log(this.feedDataSet);
      } else {
        zest.dismiss();
        console.log("Sin acceso a la app");
      }
    }, (err) => {
      zest.dismiss();
      //Connection failed message
    });
  }


  async presentModalPassword() {
    let modal = this.modalCtrl.create(EditprofilePage, {
      user_id: this.userPostData.user_id,
      token: this.userPostData.token, modalPassword: this.selectorModalPassword,
      username: this.userPostData.username
    });
    modal.present();
    modal.onDidDismiss((data) => {
      this.getFeed();
      console.log(data);
    })
  }

  async presentModalMessage() {
    let modal = this.modalCtrl.create(EditprofilePage, {
      user_id: this.userPostData.user_id,
      token: this.userPostData.token,
      modalMessage: this.selectorModalMessage,
      username: this.userPostData.username
    });
    modal.present();
    modal.onDidDismiss((data) => {
      this.getFeed();
      console.log(data);
    })
  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Elegir la imagen',
      buttons: [
        {
          text: 'Cargar de la galería',
          cssClass: 'secondary',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Usar la cámara',
          cssClass: 'secondary',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancelar',
          role: 'destructive'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    let options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        let currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        let correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }).catch((err) => {
      this.presentToast('Error seleccionando la imagen');
    });
  }
  // Create a new name for the image
  public createFileName() {
    let d = new Date(),
      n = d.getTime();
    return n + ".jpg";
  }

// Copy the image to a local folder
  public copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
      this.uploadImage(this.lastImage);
    }).catch((error) => {
      this.presentToast('Ocurrió un error cuando guardabamos tu archivo');
    });
  }

// Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return this.file.dataDirectory + img;
    }
  }

  public uploadImage(fileName)
  {
    // Destination URL
    let url = "https://bsafe.tepongoenred.com/uploadAvatarUrl";

    // File for Upload
    let targetPath = this.pathForImage(fileName);

    // File name only
    let filename = fileName;

    let options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params : {'fileName': filename},
      headers : this.userPostData
    };

    const fileTransfer: FileTransferObject = this.transfer.create();

    this.loading = this.loadingCtrl.create({
      content: 'Subiendo archivos',
    });
    this.loading.present();

    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options).then(data => {
      this.loading.dismissAll();
      this.presentToast('Imagen subida correctamente');
      this.getFeed();
    }).catch((err)  => {
      this.loading.dismissAll();
      this.presentToast('Ups! Hubo un error cargando tu imagen');
    });
  }

  presentAlertLogOut(){
    let zest = this.loadctrl.create({
      content: "Cerrando sesión"
    });
    zest.present().then((success) => {
      localStorage.clear();
      localStorage.removeItem('userData');
      this.app.getRootNav().setRoot(LoginPage);
      zest.dismiss();
    }).catch((err) => {
      zest.dismiss();
    });
  }
}
