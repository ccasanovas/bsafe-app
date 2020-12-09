webpackJsonp([7],{

/***/ 108:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddcontactmodalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AddcontactmodalPage = /** @class */ (function () {
    function AddcontactmodalPage(navCtrl, navParams, modalCtrl, viewCtrl, authService, menuCtrl, alertCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.viewCtrl = viewCtrl;
        this.authService = authService;
        this.menuCtrl = menuCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.is_whatsapp = { isChecked: false };
        this.userPostData = { "name": "", "phone_number": "",
            "token": this.navParams.get('token'), 'is_whatsapp': this.is_whatsapp, "username": this.navParams.get('username') };
        this.menuCtrl.enable(false);
    }
    AddcontactmodalPage.prototype.showalertinfo = function () {
        var alert = this.alertCtrl.create({
            title: "Notification",
            subTitle: "Hubo un error con la información ingresada",
            buttons: ["OK"]
        });
        alert.present();
    };
    AddcontactmodalPage.prototype.showalertconnect = function () {
        var alert = this.alertCtrl.create({
            title: "Notification",
            subTitle: "Ha fallado la conexión",
            buttons: ["OK"]
        });
        alert.present();
    };
    AddcontactmodalPage.prototype.sendContactData = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Guardando contacto"
        });
        loader.present();
        if (this.userPostData.phone_number.length < 11) {
            if (this.userPostData.phone_number.length > 9) {
                if (this.userPostData.name && this.userPostData.phone_number
                    && this.userPostData.token) {
                    //Api connections
                    this.authService.postData(this.userPostData, "addContact").then(function (result) {
                        loader.dismiss();
                        _this.responseData = result;
                        if (_this.responseData.code == 200) {
                            console.log(_this.responseData);
                            _this.dismissModal();
                        }
                    }).catch(function (err) {
                        loader.dismiss();
                        if (err.status == 404) {
                            var message = JSON.parse(err.error);
                            _this.showalertData(message.status);
                        }
                    });
                }
                else {
                    loader.dismiss();
                    this.showalertinfo();
                }
            }
            else {
                loader.dismiss();
                this.showalertData('El número de teléfono debería tener 10 dígitos, código de área y número de teléfono sin 0 y sin 15. Ejemplo: 2235468978 (mar del plata)');
            }
        }
        else {
            loader.dismiss();
            this.showalertData('El número de teléfono debería tener 10 dígitos, código de área y número de teléfono sin 0 y sin 15. Ejemplo: 2235468978 (mar del plata)');
        }
    };
    AddcontactmodalPage.prototype.showalertData = function (data) {
        var alert = this.alertCtrl.create({
            title: "Notificación",
            subTitle: data,
            buttons: ["OK"]
        });
        alert.present();
    };
    AddcontactmodalPage.prototype.dismissModal = function () {
        var result = "cerrando modal";
        this.viewCtrl.dismiss(result);
    };
    AddcontactmodalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-addcontactmodal',template:/*ion-inline-start:"C:\ccasanovasgit\bsafe-app\frontApp\src\pages\addcontactmodal\addcontactmodal.html"*/'<!--\n  Generated template for the AddcontactmodalPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar class="login-content">\n    <ion-buttons left menuToggle>\n      <button ion-button icon-only>\n        <ion-icon name="menu" style="color:#ffffff; font-size:30px;"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title style="text-align:center">Agregar contacto</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content class="login-content" padding>\n  <div class="login-box">\n\n  <ion-row style="margin-top: 5%;">\n    <ion-col>\n      <ion-list inset>\n\n        <ion-item style="border: 2px solid #7f69a5; margin-bottom: 5%; background-color: #ffffff;  font-family: \'Roboto Light\'; font-weight: 400; font-size: 16px">\n          <ion-input type="text" placeholder="Nombre" [(ngModel)]="userPostData.name"   ></ion-input>\n        </ion-item>\n\n        <ion-item style="border: 2px solid #7f69a5; background-color: #ffffff; font-family: \'Roboto Light\'; font-weight: 400; font-size: 16px">\n          <ion-input type="tel" placeholder="Número de teléfono" [(ngModel)]="userPostData.phone_number"   ></ion-input>\n        </ion-item>\n        <ion-row style="margin-top: 5%; visibility: hidden;">\n        <ion-label style="font-family: \'Roboto\'; color: #f1f1f1; font-weight: 400; font-size: 14px" >¿Desea enviar una alerta vía whatsapp?</ion-label>\n          <ion-checkbox color="secondary" checked="false" [(ngModel)]="is_whatsapp.isChecked"></ion-checkbox>\n          <ion-input style="display: none;" type="hidden"  [(ngModel)]="userPostData.user_id"></ion-input>\n        </ion-row>\n      </ion-list>\n    </ion-col>\n  </ion-row>\n  </div>\n\n  <ion-fab  bottom right style="margin-right: 5%;">\n    <button class="ionFabClass" (click)="sendContactData()" ion-fab color="primary"><ion-icon style="color: #f1f1f1" name="checkmark-circle-outline"></ion-icon></button>\n  </ion-fab>\n\n  <ion-fab  bottom right style="margin-right: 25%; ">\n    <button class="ionFabClass" (click)="dismissModal()" ion-fab color="primary"><ion-icon style="color: #f1f1f1"  name="close"></ion-icon></button>\n  </ion-fab>\n\n</ion-content>\n'/*ion-inline-end:"C:\ccasanovasgit\bsafe-app\frontApp\src\pages\addcontactmodal\addcontactmodal.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__["a" /* AuthServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
    ], AddcontactmodalPage);
    return AddcontactmodalPage;
}());

//# sourceMappingURL=addcontactmodal.js.map

/***/ }),

/***/ 109:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__addcontactmodal_addcontactmodal__ = __webpack_require__(108);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





var ContactsPage = /** @class */ (function () {
    function ContactsPage(authService, modalCtrl, navCtrl, navParams, menuCtrl, alertCtrl, loadingCtrl) {
        this.authService = authService;
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menuCtrl = menuCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.userPostData = {
            "user_id": "",
            "token": "",
            "username": ""
        };
        this.deleteData = {
            "phone_number": "",
            "user_id": "",
            "token": "",
            "username": ""
        };
        this.menuCtrl.enable(false);
        var data = JSON.parse(localStorage.getItem('userData'));
        this.userDetails = data.userData;
        this.userPostData = this.userDetails;
        this.getFeed();
    }
    ContactsPage.prototype.presentModal = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__addcontactmodal_addcontactmodal__["a" /* AddcontactmodalPage */], { user_id: this.userPostData.user_id,
                    token: this.userPostData.token, username: this.userPostData.username });
                modal.present();
                modal.onDidDismiss(function (data) {
                    _this.getFeed();
                    console.log(data);
                });
                return [2 /*return*/];
            });
        });
    };
    ContactsPage.prototype.getFeed = function () {
        var _this = this;
        var zest = this.loadingCtrl.create({
            content: "Obteniendo datos"
        });
        zest.present();
        this.authService.postData(this.userPostData, "getHome").then(function (result) {
            zest.dismiss();
            _this.resposeData = result;
            if (_this.resposeData.contacts) {
                _this.contactsData = JSON.parse(_this.resposeData.contacts);
                _this.feedDataSet = (_this.resposeData.feedData);
                console.log(_this.contactsData);
            }
            else {
                zest.dismiss();
                console.log("Sin acceso a la app");
            }
        }, function (err) {
            zest.dismiss();
            //Connection failed message
        });
    };
    ContactsPage.prototype.presentAlert = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.deleteData = {
                            'phone_number': data,
                            'user_id': this.userDetails.user_id,
                            'token': this.userDetails.token,
                            'username': this.userDetails.username
                        };
                        return [4 /*yield*/, this.alertCtrl.create({
                                message: 'Seguro desea borrar este número?',
                                buttons: [
                                    {
                                        text: 'Cancelar',
                                        role: 'destructive',
                                        cssClass: 'secondary',
                                        handler: function (blah) {
                                            console.log('Confirm Cancel: blah');
                                        }
                                    }, {
                                        text: 'Ok',
                                        role: 'Confirm',
                                        handler: function () {
                                            _this.deleteContact(_this.deleteData);
                                            console.log(_this.deleteData);
                                        }
                                    }
                                ]
                            })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        alert.onDidDismiss(function (data) {
                            console.log(data);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    ContactsPage.prototype.deleteContact = function (deleteData) {
        var _this = this;
        var zest = this.loadingCtrl.create({
            content: "Obteniendo datos"
        });
        zest.present();
        this.authService.postData(deleteData, "deleteContact").then(function (result) {
            zest.dismiss();
            _this.resposeData = result;
            if (_this.resposeData.code == 200) {
                _this.getFeed();
            }
        }).catch(function (err) {
            zest.dismiss();
            if (err.status == 404) {
                var message = JSON.parse(err.error);
                _this.showalertData(message.status);
            }
            //Connection failed message
        });
    };
    ContactsPage.prototype.showalertData = function (data) {
        var alert = this.alertCtrl.create({
            title: "Notificación",
            subTitle: data,
            buttons: ["OK"]
        });
        alert.present();
    };
    ContactsPage.prototype.showalertinfo = function () {
        var alert = this.alertCtrl.create({
            title: "Notification",
            subTitle: "Verifique la información ingresada",
            buttons: ["OK"]
        });
        alert.present();
    };
    ContactsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-account',template:/*ion-inline-start:"C:\ccasanovasgit\bsafe-app\frontApp\src\pages\contacts\contacts.html"*/'<ion-header>\n  <ion-navbar class="login-content">\n    <ion-buttons left menuToggle>\n      <button ion-button icon-only>\n        <ion-icon name="menu" style="color:#ffffff; font-size:30px;"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title style="text-align:center; font-family: \'Roboto\'">Mis contactos</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content fullscreen >\n  <br><br>\n\n  <ion-list *ngFor="let item of (contactsData || []);">\n    <ion-card>\n      <ion-item>\n        <ion-avatar item-left><img src="https://cdn.pixabay.com/photo/2016/03/31/14/47/avatar-1292817_960_720.png" style="width: 34px; height: 38px;">\n        </ion-avatar>\n        <span style="font-family: \'Roboto\'">{{item.name}}</span><br>\n        <span style="font-family: \'Roboto\'; font-size: 12px">{{item.phone_number}}</span>\n        <button ion-button style="background-color: #f30d0d; font-family: \'Roboto\'" (click)="presentAlert(item.phone_number)" item-right>+ Borrar</button>\n      </ion-item>\n    </ion-card>\n  </ion-list>\n  <ion-fab bottom right style="margin-right: 5%">\n      <button (click)="presentModal()" ion-fab color="primary"><ion-icon style="color: #f1f1f1" name="add"></ion-icon></button>\n    </ion-fab>\n  </ion-content>\n'/*ion-inline-end:"C:\ccasanovasgit\bsafe-app\frontApp\src\pages\contacts\contacts.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__["a" /* AuthServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
    ], ContactsPage);
    return ContactsPage;
}());

//# sourceMappingURL=contacts.js.map

/***/ }),

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditprofilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the EditprofilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var EditprofilePage = /** @class */ (function () {
    function EditprofilePage(navCtrl, navParams, modalCtrl, viewCtrl, authService, menuCtrl, alertCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.viewCtrl = viewCtrl;
        this.authService = authService;
        this.menuCtrl = menuCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.send_location = { isChecked: false };
        this.userPostDataMessage = { "message": "",
            "token": this.navParams.get('token'), "send_location": this.send_location, "username": this.navParams.get('username') };
        this.userPostDataPassword = { "password": "", "newPassword": "", "newConfirmPassword": "",
            "token": this.navParams.get('token'), "username": this.navParams.get('username') };
        this.modalChangePassword = this.navParams.get('modalPassword');
        this.modalChangeMessage = this.navParams.get('modalMessage');
        this.menuCtrl.enable(false);
    }
    EditprofilePage.prototype.editMessageData = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Actualizando mensaje de emergencia"
        });
        loader.present();
        if (this.userPostDataMessage.message
            && this.userPostDataMessage.token) {
            //Api connections
            this.authService.postData(this.userPostDataMessage, "changeMessage").then(function (result) {
                loader.dismiss();
                _this.responseData = result;
                if (_this.responseData.code == 200) {
                    _this.dismissModal();
                }
            }).catch(function (err) {
                console.log(err);
                loader.dismiss();
                if (err.status == 404) {
                    var message = JSON.parse(err.error);
                    _this.showalertData(message.status);
                }
                else {
                    _this.showalertconnect();
                }
            });
        }
        else {
            loader.dismiss();
            this.showalertinfo();
        }
    };
    EditprofilePage.prototype.showalertData = function (data) {
        var alert = this.alertCtrl.create({
            title: "Notificación",
            subTitle: data,
            buttons: ["OK"]
        });
        alert.present();
    };
    EditprofilePage.prototype.editPasswordData = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Actualizando contraseña"
        });
        loader.present();
        if (this.userPostDataPassword.newPassword
            == this.userPostDataPassword.newConfirmPassword
            && this.userPostDataPassword.token
            && this.userPostDataPassword.newConfirmPassword.length > 5
            && this.userPostDataPassword.newPassword.length > 5) {
            //Api connections
            this.authService.postData(this.userPostDataPassword, "changePassword").then(function (result) {
                loader.dismiss();
                _this.responseData = result;
                if (_this.responseData.code == 200) {
                    console.log(_this.responseData);
                    _this.dismissModal();
                }
            }).catch(function (err) {
                loader.dismiss();
                if (err.status == 404) {
                    var message = JSON.parse(err.error);
                    _this.showalertData(message.status);
                }
                else {
                    _this.showalertconnect();
                }
            });
        }
        else {
            loader.dismiss();
            this.showalertPassword();
        }
    };
    EditprofilePage.prototype.showalertPassword = function () {
        var alert = this.alertCtrl.create({
            title: "Notificación",
            subTitle: "Verifique que su nuevo password tenga más de 5 caractéres y ambos campos coincidan",
            buttons: ["OK"]
        });
        alert.present();
    };
    EditprofilePage.prototype.showalertinfo = function () {
        var alert = this.alertCtrl.create({
            title: "Notificación",
            subTitle: "Por favor complete su mensaje de emergencia",
            buttons: ["OK"]
        });
        alert.present();
    };
    EditprofilePage.prototype.showalertconnect = function () {
        var alert = this.alertCtrl.create({
            title: "Notificación",
            subTitle: "Ha fallado la conexión",
            buttons: ["OK"]
        });
        alert.present();
    };
    EditprofilePage.prototype.dismissModal = function () {
        var result = "cerrando modal";
        this.viewCtrl.dismiss(result);
    };
    EditprofilePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EditprofilePage');
    };
    EditprofilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-editprofile',template:/*ion-inline-start:"C:\ccasanovasgit\bsafe-app\frontApp\src\pages\editprofile\editprofile.html"*/'<!--\n  Generated template for the EditprofilePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header *ngIf="modalChangeMessage" >\n  <ion-navbar class="login-content">\n    <ion-buttons left menuToggle>\n      <button ion-button icon-only>\n        <ion-icon name="menu" style="color:#ffffff; font-size:30px;"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title style="text-align:center; font-family: \'Roboto\'">Editar mensaje</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content *ngIf="modalChangeMessage"  class="login-content" padding>\n\n  <ion-card style="margin-top: 5%;">\n    <ion-card-header>\n      <ion-grid >\n        <ion-row>\n          <ion-item>\n            <ion-textarea placeholder="Ingrese su mensaje de emergencia aquí"  [(ngModel)]="userPostDataMessage.message"></ion-textarea>\n          </ion-item>\n        </ion-row>\n\n      </ion-grid>\n    </ion-card-header>\n\n  </ion-card>\n  <ion-row style="margin-top: 5%; visibility: hidden;">\n    <ion-label style="font-family: \'Roboto\'; color: #f1f1f1; font-weight: 400; font-size: 14px; width: 75%" >¿Desea enviar su ubicación <br> en el mensaje de emergencia?</ion-label>\n    <ion-checkbox style="margin-right: 15%"  color="secondary" checked="false" [(ngModel)]="send_location.isChecked"></ion-checkbox>\n  </ion-row>\n  <!-- Textarea in an item with a placeholder -->\n\n\n\n  <ion-fab  bottom right style="margin-right: 5%;">\n    <button class="ionFabClass" (click)="editMessageData()" ion-fab color="primary"><ion-icon style="color: #f1f1f1" name="checkmark-circle-outline"></ion-icon></button>\n  </ion-fab>\n\n  <ion-fab  bottom right style="margin-right: 25%; ">\n    <button class="ionFabClass" (click)="dismissModal()" ion-fab color="primary"><ion-icon style="color: #f1f1f1"  name="close"></ion-icon></button>\n  </ion-fab>\n</ion-content>\n\n\n\n<ion-header *ngIf="modalChangePassword" >\n  <ion-navbar class="login-content">\n    <ion-buttons left menuToggle>\n      <button ion-button icon-only>\n        <ion-icon name="menu" style="color:#ffffff; font-size:30px;"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title style="text-align:center; font-family: \'Roboto\'">Editar contraseña</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content *ngIf="modalChangePassword" class="login-content" padding>\n\n  <div class="login-box" style="margin-top: 5%">\n    <ion-row>\n      <ion-col>\n        <ion-list inset>\n          <ion-item style="background-color: #f1f1f1; margin-top: 4%; font-family: \'Roboto\'; font-weight: 400; font-size: 16px">\n            <ion-input type="password" placeholder="Contraseña nueva"  [(ngModel)]="userPostDataPassword.newPassword" ></ion-input>\n          </ion-item>\n          <ion-item style="background-color: #f1f1f1; margin-top: 4%; font-family: \'Roboto\'; font-weight: 400; font-size: 16px">\n            <ion-input type="password" placeholder="Confirmar contraseña"  [(ngModel)]="userPostDataPassword.newConfirmPassword" ></ion-input>\n          </ion-item>\n\n        </ion-list>\n      </ion-col>\n    </ion-row>\n\n  </div>\n  <!-- Textarea in an item with a placeholder -->\n\n\n\n  <ion-fab  bottom right style="margin-right: 5%; ">\n    <button class="ionFabClass" (click)="editPasswordData()" ion-fab color="primary"><ion-icon style="color: #f1f1f1" name="checkmark-circle-outline"></ion-icon></button>\n  </ion-fab>\n\n  <ion-fab  bottom right style="margin-right: 25%; ">\n    <button class="ionFabClass" (click)="dismissModal()" ion-fab color="primary"><ion-icon style="color: #f1f1f1"  name="close"></ion-icon></button>\n  </ion-fab>\n</ion-content>\n'/*ion-inline-end:"C:\ccasanovasgit\bsafe-app\frontApp\src\pages\editprofile\editprofile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__["a" /* AuthServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
    ], EditprofilePage);
    return EditprofilePage;
}());

//# sourceMappingURL=editprofile.js.map

/***/ }),

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyprofilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__editprofile_editprofile__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_file_transfer__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_file__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_path__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_geolocation__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__login_login__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};










var MyprofilePage = /** @class */ (function () {
    function MyprofilePage(authService, navCtrl, menuCtrl, loadctrl, modalCtrl, loadingCtrl, toastCtrl, transfer, camera, file, actionSheetCtrl, filePath, platform, geolocation, alertCtrl, app) {
        var _this = this;
        this.authService = authService;
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
        this.loadctrl = loadctrl;
        this.modalCtrl = modalCtrl;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.transfer = transfer;
        this.camera = camera;
        this.file = file;
        this.actionSheetCtrl = actionSheetCtrl;
        this.filePath = filePath;
        this.platform = platform;
        this.geolocation = geolocation;
        this.alertCtrl = alertCtrl;
        this.app = app;
        this.userPostData = {
            "user_id": "",
            "token": "",
            "username": ""
        };
        this.lastImage = null;
        this.menuCtrl.enable(true);
        var data = JSON.parse(localStorage.getItem('userData'));
        this.userDetails = data.userData;
        this.userPostData = this.userDetails;
        this.contactData = this.getFeed().then(function (success) {
            _this.getGPSPermissions();
        });
        this.selectorModalPassword = { "modal_type": "ChangePassword" };
        this.selectorModalMessage = { "modal_type": "ChangeMessage" };
        this.lastImage = "";
    }
    MyprofilePage.prototype.getGPSPermissions = function () {
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (resp) {
            console.log(resp);
        }).catch(function (err) {
            var alert = _this.alertCtrl.create({
                message: 'BSafe necesita permisos a su ubicación para enviarla en sus alertas',
                buttons: [
                    {
                        text: 'Ok',
                        role: 'destructive',
                        cssClass: 'secondary',
                        handler: function (blah) {
                            _this.getGPSPermissions();
                        }
                    }
                ]
            });
            alert.present();
            alert.onDidDismiss(function (data) {
                console.log(data);
            });
            console.log('Error actualizando ubicación', err);
        });
    };
    MyprofilePage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    MyprofilePage.prototype.getFeed = function () {
        return __awaiter(this, void 0, void 0, function () {
            var zest;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        zest = this.loadctrl.create({
                            content: "Obteniendo datos"
                        });
                        zest.present();
                        return [4 /*yield*/, this.authService.postData(this.userPostData, "getHome").then(function (result) {
                                zest.dismiss();
                                _this.resposeData = result;
                                if (_this.resposeData.contactData) {
                                    _this.feedDataSet = (_this.resposeData.contactData);
                                    console.log(_this.feedDataSet);
                                }
                                else {
                                    zest.dismiss();
                                    console.log("Sin acceso a la app");
                                }
                            }, function (err) {
                                zest.dismiss();
                                //Connection failed message
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyprofilePage.prototype.presentModalPassword = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__editprofile_editprofile__["a" /* EditprofilePage */], {
                    user_id: this.userPostData.user_id,
                    token: this.userPostData.token, modalPassword: this.selectorModalPassword,
                    username: this.userPostData.username
                });
                modal.present();
                modal.onDidDismiss(function (data) {
                    _this.getFeed();
                    console.log(data);
                });
                return [2 /*return*/];
            });
        });
    };
    MyprofilePage.prototype.presentModalMessage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__editprofile_editprofile__["a" /* EditprofilePage */], {
                    user_id: this.userPostData.user_id,
                    token: this.userPostData.token,
                    modalMessage: this.selectorModalMessage,
                    username: this.userPostData.username
                });
                modal.present();
                modal.onDidDismiss(function (data) {
                    _this.getFeed();
                    console.log(data);
                });
                return [2 /*return*/];
            });
        });
    };
    MyprofilePage.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Elegir la imagen',
            buttons: [
                {
                    text: 'Cargar de la galería',
                    cssClass: 'secondary',
                    handler: function () {
                        _this.takePicture(_this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: 'Usar la cámara',
                    cssClass: 'secondary',
                    handler: function () {
                        _this.takePicture(_this.camera.PictureSourceType.CAMERA);
                    }
                },
                {
                    text: 'Cancelar',
                    role: 'destructive'
                }
            ]
        });
        actionSheet.present();
    };
    MyprofilePage.prototype.takePicture = function (sourceType) {
        var _this = this;
        // Create options for the Camera Dialog
        var options = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };
        // Get the data of an image
        this.camera.getPicture(options).then(function (imagePath) {
            // Special handling for Android library
            if (_this.platform.is('android') && sourceType === _this.camera.PictureSourceType.PHOTOLIBRARY) {
                _this.filePath.resolveNativePath(imagePath)
                    .then(function (filePath) {
                    var correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    var currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                    _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
                });
            }
            else {
                var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
            }
        }).catch(function (err) {
            _this.presentToast('Error seleccionando la imagen');
        });
    };
    // Create a new name for the image
    MyprofilePage.prototype.createFileName = function () {
        var d = new Date(), n = d.getTime();
        return n + ".jpg";
    };
    // Copy the image to a local folder
    MyprofilePage.prototype.copyFileToLocalDir = function (namePath, currentName, newFileName) {
        var _this = this;
        this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(function (success) {
            _this.lastImage = newFileName;
            _this.uploadImage(_this.lastImage);
        }).catch(function (error) {
            _this.presentToast('Ocurrió un error cuando guardabamos tu archivo');
        });
    };
    // Always get the accurate path to your apps folder
    MyprofilePage.prototype.pathForImage = function (img) {
        if (img === null) {
            return '';
        }
        else {
            return this.file.dataDirectory + img;
        }
    };
    MyprofilePage.prototype.uploadImage = function (fileName) {
        var _this = this;
        // Destination URL
        var url = "https://bsafe.tepongoenred.com/uploadAvatarUrl";
        // File for Upload
        var targetPath = this.pathForImage(fileName);
        // File name only
        var filename = fileName;
        var options = {
            fileKey: "file",
            fileName: filename,
            chunkedMode: false,
            mimeType: "multipart/form-data",
            params: { 'fileName': filename },
            headers: this.userPostData
        };
        var fileTransfer = this.transfer.create();
        this.loading = this.loadingCtrl.create({
            content: 'Subiendo archivos',
        });
        this.loading.present();
        // Use the FileTransfer to upload the image
        fileTransfer.upload(targetPath, url, options).then(function (data) {
            _this.loading.dismissAll();
            _this.presentToast('Imagen subida correctamente');
            _this.getFeed();
        }).catch(function (err) {
            _this.loading.dismissAll();
            _this.presentToast('Ups! Hubo un error cargando tu imagen');
        });
    };
    MyprofilePage.prototype.presentAlertLogOut = function () {
        var _this = this;
        var zest = this.loadctrl.create({
            content: "Cerrando sesión"
        });
        zest.present().then(function (success) {
            localStorage.clear();
            localStorage.removeItem('userData');
            _this.app.getRootNav().setRoot(__WEBPACK_IMPORTED_MODULE_9__login_login__["a" /* LoginPage */]);
            zest.dismiss();
        }).catch(function (err) {
            zest.dismiss();
        });
    };
    MyprofilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-myprofile',template:/*ion-inline-start:"C:\ccasanovasgit\bsafe-app\frontApp\src\pages\myprofile\myprofile.html"*/'<ion-header>\n  <ion-navbar class="login-content">\n    <ion-buttons left menuToggle>\n      <button ion-button icon-only>\n        <ion-icon name="menu" style="color:#ffffff; font-size:30px;"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title style="text-align:center">Mi perfil</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content has-header="true" >\n\n  <div id="profile-bg"></div>\n  <div id="content">\n    <div *ngIf="feedDataSet" id="profile-info">\n      <img  id="profile-image"  src="https://bsafe.tepongoenred.com/uploads/{{feedDataSet.avatar}}">\n      <button (click)="presentActionSheet()" id="addProfilePicture">+</button>\n      <h5 id="profile-name">{{userDetails.username}}</h5>\n    </div>\n    <ion-list>\n      <ion-item>\n        <ion-buttons>\n          <button style="font-family: \'Roboto\'; font-weight: 400; font-size: 16px" ion-button class="submit-btn" (click)="presentModalPassword()" full>Cambiar contraseña</button>\n          <button style="font-family: \'Roboto\'; font-weight: 400; font-size: 16px" ion-button class="submit-btn" (click)="presentModalMessage()" full>Editar mensaje de emergencia</button>\n          <button style="font-family: \'Roboto\'; font-weight: 400; font-size: 16px;"  color="danger" ion-button (click)="presentAlertLogOut()" full >Cerrar sesión</button>\n\n        </ion-buttons>\n      </ion-item>\n    </ion-list>\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"C:\ccasanovasgit\bsafe-app\frontApp\src\pages\myprofile\myprofile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__["a" /* AuthServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_file_transfer__["a" /* FileTransfer */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_path__["a" /* FilePath */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */]])
    ], MyprofilePage);
    return MyprofilePage;
}());

//# sourceMappingURL=myprofile.js.map

/***/ }),

/***/ 120:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 120;

/***/ }),

/***/ 162:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/addcontactmodal/addcontactmodal.module": [
		293,
		6
	],
	"../pages/contacts/contacts.module": [
		294,
		5
	],
	"../pages/editprofile/editprofile.module": [
		295,
		4
	],
	"../pages/forgot-password/forgot-password.module": [
		296,
		3
	],
	"../pages/login/login.module": [
		297,
		2
	],
	"../pages/myprofile/myprofile.module": [
		298,
		1
	],
	"../pages/register/register.module": [
		299,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 162;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 17:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(265);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_http__ = __webpack_require__(164);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var apiUrl = 'https://bsafe.tepongoenred.com/';
var AuthServiceProvider = /** @class */ (function () {
    function AuthServiceProvider(http, nativeHttp) {
        this.http = http;
        this.nativeHttp = nativeHttp;
        console.log('Hello AuthServiceProvider Provider');
    }
    AuthServiceProvider.prototype.postData = function (credentials, type) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            //Don't check SSL Certificate
            _this.nativeHttp.setSSLCertMode('nocheck');
            _this.nativeHttp.setHeader('*', 'content-type', 'application/json');
            //Important to set the data serializer or the request gets rejected
            _this.nativeHttp.setDataSerializer('json');
            _this.nativeHttp.post(apiUrl + type, credentials, {}).then(function (res) {
                resolve(JSON.parse(res.data));
            }, function (err) {
                reject(err);
            });
        });
    };
    AuthServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_http__["a" /* HTTP */]])
    ], AuthServiceProvider);
    return AuthServiceProvider;
}());

//# sourceMappingURL=auth-service.js.map

/***/ }),

/***/ 217:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(240);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 240:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_login_login__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_register_register__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_auth_service_auth_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_http__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_home_home__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_tabs_tabs__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_contacts_contacts__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_addcontactmodal_addcontactmodal__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_myprofile_myprofile__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_editprofile_editprofile__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_sms__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_camera__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_file_transfer__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_native_file__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_file_path__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_native_android_permissions__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__ionic_native_diagnostic__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__ionic_native_location_accuracy__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__ionic_native_http__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_forgot_password_forgot_password__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__ionic_native_fcm__ = __webpack_require__(215);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





























// @ts-ignore
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_contacts_contacts__["a" /* ContactsPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_addcontactmodal_addcontactmodal__["a" /* AddcontactmodalPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_myprofile_myprofile__["a" /* MyprofilePage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_editprofile_editprofile__["a" /* EditprofilePage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_forgot_password_forgot_password__["a" /* ForgotPasswordPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["a" /* BrowserModule */], __WEBPACK_IMPORTED_MODULE_11__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/addcontactmodal/addcontactmodal.module#AddcontactmodalPageModule', name: 'AddcontactmodalPage', segment: 'addcontactmodal', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/contacts/contacts.module#ContactsPageModule', name: 'ContactsPage', segment: 'contacts', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/editprofile/editprofile.module#EditprofilePageModule', name: 'EditprofilePage', segment: 'editprofile', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/forgot-password/forgot-password.module#ForgotPasswordPageModule', name: 'ForgotPasswordPage', segment: 'forgot-password', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/myprofile/myprofile.module#MyprofilePageModule', name: 'MyprofilePage', segment: 'myprofile', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/register/register.module#RegisterPageModule', name: 'RegisterPage', segment: 'register', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["a" /* IonicStorageModule */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_15__pages_addcontactmodal_addcontactmodal__["a" /* AddcontactmodalPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_contacts_contacts__["a" /* ContactsPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_myprofile_myprofile__["a" /* MyprofilePage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_editprofile_editprofile__["a" /* EditprofilePage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_forgot_password_forgot_password__["a" /* ForgotPasswordPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__["a" /* Geolocation */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_10__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_26__ionic_native_http__["a" /* HTTP */],
                __WEBPACK_IMPORTED_MODULE_19__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_20__ionic_native_file_transfer__["b" /* FileTransferObject */],
                __WEBPACK_IMPORTED_MODULE_20__ionic_native_file_transfer__["a" /* FileTransfer */],
                __WEBPACK_IMPORTED_MODULE_21__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_18__ionic_native_sms__["a" /* SMS */],
                __WEBPACK_IMPORTED_MODULE_24__ionic_native_diagnostic__["a" /* Diagnostic */],
                __WEBPACK_IMPORTED_MODULE_25__ionic_native_location_accuracy__["a" /* LocationAccuracy */],
                __WEBPACK_IMPORTED_MODULE_23__ionic_native_android_permissions__["a" /* AndroidPermissions */],
                __WEBPACK_IMPORTED_MODULE_22__ionic_native_file_path__["a" /* FilePath */],
                __WEBPACK_IMPORTED_MODULE_28__ionic_native_fcm__["a" /* FCM */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 290:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_login_login__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_auth_service_auth_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_fcm__ = __webpack_require__(215);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var MyApp = /** @class */ (function () {
    function MyApp(platform, SplashScreen, StatusBar, loadingCtrl, alertCtrl, authService, fcm) {
        var _this = this;
        this.SplashScreen = SplashScreen;
        this.StatusBar = StatusBar;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.authService = authService;
        this.fcm = fcm;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_2__pages_login_login__["a" /* LoginPage */];
        this.userPostData = {
            "token": "",
            "username": ""
        };
        platform.ready().then(function () {
            // get FCM token
            _this.fcm.getToken().then(function (token) {
                console.log("FCM Token: " + token);
            });
            // ionic push notification example
            _this.fcm.onNotification().subscribe(function (data) {
                console.log(data);
                if (data.wasTapped) {
                    console.log('Received in background');
                }
                else {
                    console.log('Received in foreground');
                }
            });
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            var data = JSON.parse(localStorage.getItem('userData'));
            if (data.userData.token != null) {
                _this.userDetails = data.userData;
                _this.userPostData = _this.userDetails;
                _this.autoLogin();
            }
            _this.StatusBar.styleDefault();
            _this.SplashScreen.hide();
        });
    }
    MyApp.prototype.autoLogin = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Iniciando sesión"
        });
        loader.present();
        this.authService.postData(this.userPostData, "autoLogin").then(function (result) {
            loader.dismiss();
            _this.resposeData = result;
            console.log(_this.resposeData);
            if (_this.resposeData.code == 200) {
                localStorage.setItem('userData', JSON.stringify(_this.resposeData));
                _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__["a" /* TabsPage */]);
            }
            else {
                loader.dismiss();
                _this.showalertData(_this.resposeData.status);
            }
        }, function (err) {
            loader.dismiss();
            _this.showalertconnect();
            //Connection failed message
        });
    };
    MyApp.prototype.showalertconnect = function () {
        var alert = this.alertCtrl.create({
            title: "Notificación",
            subTitle: "Se encuentra sin conexión a la app",
            buttons: ["OK"]
        });
        alert.present();
    };
    MyApp.prototype.showalertData = function (data) {
        var alert = this.alertCtrl.create({
            title: "Notificación",
            subTitle: data,
            buttons: ["OK"]
        });
        alert.present();
    };
    MyApp.prototype.onclickHome = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__["a" /* TabsPage */]);
    };
    MyApp.prototype.onclickadd = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */]);
    };
    MyApp.prototype.onclicklogout = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_2__pages_login_login__["a" /* LoginPage */]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\ccasanovasgit\bsafe-app\frontApp\src\app\app.html"*/'\n\n  <!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n  <ion-nav  [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n'/*ion-inline-end:"C:\ccasanovasgit\bsafe-app\frontApp\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_7__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_fcm__["a" /* FCM */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_register_register__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tabs_tabs__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__forgot_password_forgot_password__ = __webpack_require__(54);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, menuCtrl, authService, alertCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menuCtrl = menuCtrl;
        this.authService = authService;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.userData = { "username": "", "password": "" };
        this.menuCtrl.enable(false);
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Iniciando sesión"
        });
        loader.present();
        if (this.userData.username
            && this.userData.password
            && this.userData.username.length > 5
            && this.userData.password.length > 5) {
            this.authService.postData(this.userData, "login").then(function (result) {
                loader.dismiss();
                _this.resposeData = result;
                console.log(_this.resposeData);
                if (_this.resposeData.code == 200) {
                    localStorage.setItem('userData', JSON.stringify(_this.resposeData));
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__tabs_tabs__["a" /* TabsPage */]);
                }
                else {
                    loader.dismiss();
                    localStorage.setItem('userData', JSON.stringify(_this.resposeData));
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__tabs_tabs__["a" /* TabsPage */]);
                    _this.showalertData(_this.resposeData.status);
                }
            }).catch(function (err) {
                loader.dismiss();
                console.log(err);
                loader.dismiss();
                if (err.status == 404) {
                    var message = JSON.parse(err.error);
                    _this.showalertData(message.status);
                }
                else {
                    _this.showalertEmail();
                }
            });
        }
        else {
            loader.dismiss();
            //this.presentToast("Give username and password");
            this.showalertFront();
        }
    };
    LoginPage.prototype.showalertEmail = function () {
        var alert = this.alertCtrl.create({
            title: "Notificación",
            subTitle: "Ha fallado en el inicio de sesión del usuario. Verifique su usuario sea un email válido",
            buttons: ["OK"]
        });
        alert.present();
    };
    LoginPage.prototype.showalertFront = function () {
        var alert = this.alertCtrl.create({
            title: "Notificación",
            subTitle: "Verifique que su password tenga más de 6 carácteres y su usuario sea un email válido",
            buttons: ["OK"]
        });
        alert.present();
    };
    LoginPage.prototype.showalertData = function (data) {
        var alert = this.alertCtrl.create({
            title: "Notificación",
            subTitle: data,
            buttons: ["OK"]
        });
        alert.present();
    };
    LoginPage.prototype.onregister = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pages_register_register__["a" /* RegisterPage */]);
    };
    LoginPage.prototype.onforgot = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__forgot_password_forgot_password__["a" /* ForgotPasswordPage */]);
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"C:\ccasanovasgit\bsafe-app\frontApp\src\pages\login\login.html"*/'<ion-content style="background-color: #6a5085">\n\n  <div class="login-form">\n    <ion-row class="logo-row">\n\n    <ion-col></ion-col>\n    <ion-col>\n      <img src="./assets/img/logo.png"/>\n    </ion-col>\n    <ion-col></ion-col>\n    </ion-row>\n\n    <h1 text-center>Bienvenida</h1>\n      <div class="content">\n        <div class="input-field">\n          <ion-input type="email" placeholder="Email"  [(ngModel)]="userData.username"></ion-input>\n        </div>\n        <div class="input-field">\n          <ion-input type="password" placeholder="Contraseña"  [(ngModel)]="userData.password" ></ion-input>\n        </div>\n        <a (click)="onforgot()" class="link">Olvido su contraseña?</a>\n      </div>\n      <div class="action">\n        <button (click)="onregister()">Registrarse</button>\n        <button (click)="login()" style="background-color:#6a5085" >Iniciar sesión</button>\n      </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"C:\ccasanovasgit\bsafe-app\frontApp\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */], __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__contacts_contacts__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__myprofile_myprofile__ = __webpack_require__(111);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var TabsPage = /** @class */ (function () {
    function TabsPage(authService, navCtrl, menuCtrl) {
        this.authService = authService;
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_5__myprofile_myprofile__["a" /* MyprofilePage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_4__contacts_contacts__["a" /* ContactsPage */];
        this.userPostData = {
            "user_id": "",
            "token": "",
        };
        this.menuCtrl.enable(true);
        var data = JSON.parse(localStorage.getItem('userData'));
        JSON.parse(localStorage.getItem('feedData'));
        this.userDetails = data.userData;
        this.userPostData = this.userDetails;
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-tabs',template:/*ion-inline-start:"C:\ccasanovasgit\bsafe-app\frontApp\src\pages\tabs\tabs.html"*/'\n<ion-tabs>\n  <ion-tab [root]="tab2Root"  tabTitle="Mi perfil" tabIcon="person"></ion-tab>\n  <ion-tab [root]="tab1Root" tabTitle="Inicio" tabIcon="home"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="Contactos" tabIcon="person-add"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"C:\ccasanovasgit\bsafe-app\frontApp\src\pages\tabs\tabs.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__["a" /* AuthServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */]])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 54:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForgotPasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__register_register__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ForgotPasswordPage = /** @class */ (function () {
    function ForgotPasswordPage(navCtrl, navParams, menuCtrl, authService, alertCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menuCtrl = menuCtrl;
        this.authService = authService;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.userPostData = { "username": "" };
        this.menuCtrl.enable(false);
    }
    ForgotPasswordPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ForgotPasswordPage');
    };
    ForgotPasswordPage.prototype.onlogin = function () {
        this.navCtrl.pop();
    };
    ForgotPasswordPage.prototype.forgotPassword = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Enviando solicitud"
        });
        loader.present();
        if (this.userPostData) {
            this.authService.postData(this.userPostData, "forgotPassword").then(function (result) {
                loader.dismiss();
                _this.resposeData = result;
                console.log(_this.resposeData);
                if (_this.resposeData.code == 200) {
                    _this.showalertData(_this.resposeData.status);
                }
                else {
                    loader.dismiss();
                    _this.showalertData(_this.resposeData.status);
                }
            }).catch(function (err) {
                loader.dismiss();
                if (err.status == 404) {
                    var message = JSON.parse(err.error);
                    _this.showalertData(message.status);
                }
                else {
                    _this.showalertEmail();
                }
            });
        }
        else {
            loader.dismiss();
            //this.presentToast("Give username and password");
            this.showalertEmail();
        }
    };
    ForgotPasswordPage.prototype.showalertData = function (data) {
        var alert = this.alertCtrl.create({
            title: "Notificación",
            subTitle: data,
            buttons: ["OK"]
        });
        alert.present();
    };
    ForgotPasswordPage.prototype.showalertEmail = function () {
        var alert = this.alertCtrl.create({
            title: "Notificación",
            subTitle: "Verifique que el email utilizado sea un email válido",
            buttons: ["OK"]
        });
        alert.present();
    };
    ForgotPasswordPage.prototype.showalertinfo = function () {
        var alert = this.alertCtrl.create({
            title: "Notification",
            subTitle: "Verifique que su password y usuario coincidan con los creados",
            buttons: ["OK"]
        });
        alert.present();
    };
    ForgotPasswordPage.prototype.showalert = function (data) {
        var alert = this.alertCtrl.create({
            title: "Notificación",
            subTitle: data,
            buttons: ["OK"]
        });
        alert.present();
    };
    ForgotPasswordPage.prototype.onregister = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__register_register__["a" /* RegisterPage */]);
    };
    ForgotPasswordPage.prototype.onloginroot = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
    };
    ForgotPasswordPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-forgot-password',template:/*ion-inline-start:"C:\ccasanovasgit\bsafe-app\frontApp\src\pages\forgot-password\forgot-password.html"*/'<ion-content style="background-color: #6a5085">\n\n  <div class="login-form">\n    <ion-row class="logo-row">\n      <ion-col></ion-col>\n      <ion-col>\n        <img src="./assets/img/logo.png"/>\n      </ion-col>\n      <ion-col></ion-col>\n    </ion-row>\n    <h1 text-center>Recordar contraseña</h1>\n    <div class="content">\n      <div class="input-field">\n        <ion-input type="text" placeholder="Email" [(ngModel)]="userPostData.username"></ion-input>\n      </div>\n      <a (click)="onloginroot()" class="link">Iniciar sesión</a>\n    </div>\n    <div class="action">\n      <button  (click)="onlogin()">Volver</button>\n      <button style="background-color: #6a5085" (click)="forgotPassword()">Enviar link</button>\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"C:\ccasanovasgit\bsafe-app\frontApp\src\pages\forgot-password\forgot-password.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */], __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
    ], ForgotPasswordPage);
    return ForgotPasswordPage;
}());

//# sourceMappingURL=forgot-password.js.map

/***/ }),

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tabs_tabs__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__forgot_password_forgot_password__ = __webpack_require__(54);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var RegisterPage = /** @class */ (function () {
    function RegisterPage(authService, navCtrl, navParams, menuCtrl, alertCtrl, loadingCtrl) {
        this.authService = authService;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menuCtrl = menuCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.userData = { "username": "", "password": "", "confirm_password": "" };
        this.menuCtrl.enable(false);
    }
    RegisterPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RegisterPage');
    };
    RegisterPage.prototype.onlogin = function () {
        this.navCtrl.pop();
    };
    RegisterPage.prototype.showalertDatainfo = function () {
        var alert = this.alertCtrl.create({
            title: "Notificación",
            subTitle: "Verifique la información ingresada, la contraseña debería tener más de 5 carácteres y coincidir con la confirmación de contraseña",
            buttons: ["OK"]
        });
        alert.present();
    };
    RegisterPage.prototype.showalertData = function (data) {
        var alert = this.alertCtrl.create({
            title: "Notificación",
            subTitle: data,
            buttons: ["OK"]
        });
        alert.present();
    };
    RegisterPage.prototype.showalertEmail = function () {
        var alert = this.alertCtrl.create({
            title: "Notificación",
            subTitle: "Ha fallado en la creación del usuario. Verifique su usuario sea un email válido",
            buttons: ["OK"]
        });
        alert.present();
    };
    RegisterPage.prototype.signup = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Creando cuenta de usuario"
        });
        loader.present();
        if (this.userData.username &&
            this.userData.password.length > 5 &&
            this.userData.confirm_password.length > 5 &&
            this.userData.password == this.userData.confirm_password) {
            //Api connections
            this.authService.postData(this.userData, "signUp").then(function (result) {
                loader.dismiss();
                _this.responseData = result;
                console.log(_this.responseData);
                if (_this.responseData.code == 200) {
                    localStorage.setItem('userData', JSON.stringify(_this.responseData));
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__tabs_tabs__["a" /* TabsPage */]);
                }
                else {
                    loader.dismiss();
                    localStorage.setItem('userData', JSON.stringify(_this.responseData));
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__tabs_tabs__["a" /* TabsPage */]);
                }
            }).catch(function (err) {
                loader.dismiss();
                if (err.status == 404) {
                    var message = JSON.parse(err.error);
                    _this.showalertData(message.status);
                }
                else {
                    _this.showalertEmail();
                }
            });
        }
        else {
            loader.dismiss();
            this.showalertDatainfo();
        }
    };
    RegisterPage.prototype.onforgot = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__forgot_password_forgot_password__["a" /* ForgotPasswordPage */]);
    };
    RegisterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-register',template:/*ion-inline-start:"C:\ccasanovasgit\bsafe-app\frontApp\src\pages\register\register.html"*/'<ion-content style="background-color: #6a5085" >\n\n  <div class="login-form">\n    <ion-row class="logo-row">\n\n      <ion-col></ion-col>\n      <ion-col>\n        <img src="./assets/img/logo.png"/>\n      </ion-col>\n      <ion-col></ion-col>\n    </ion-row>\n    <h1 text-center>Registrarse</h1>\n    <div class="content">\n      <div class="input-field">\n        <ion-input type="email" placeholder="Email"  [(ngModel)]="userData.username"></ion-input>\n      </div>\n      <div class="input-field">\n        <ion-input type="password" placeholder="Contraseña"  [(ngModel)]="userData.password" ></ion-input>\n      </div>\n      <div class="input-field">\n        <ion-input type="password" placeholder="Confirmar contraseña"  [(ngModel)]="userData.confirm_password" ></ion-input>\n      </div>\n      <a (click)="onforgot()" class="link">Olvido su contraseña?</a>\n    </div>\n    <div class="action">\n      <button  (click)="onlogin()">Volver</button>\n      <button style="background-color:#6a5085" (click)="signup()">Registrarse</button>\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"C:\ccasanovasgit\bsafe-app\frontApp\src\pages\register\register.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__["a" /* AuthServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
    ], RegisterPage);
    return RegisterPage;
}());

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 85:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_sms__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_android_permissions__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_diagnostic__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_location_accuracy__ = __webpack_require__(169);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};








var HomePage = /** @class */ (function () {
    function HomePage(authService, navCtrl, menuCtrl, loadctrl, geolocation, sms, alertCtrl, androidPermissions, diagnostic, locationAccuracy) {
        var _this = this;
        this.authService = authService;
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
        this.loadctrl = loadctrl;
        this.geolocation = geolocation;
        this.sms = sms;
        this.alertCtrl = alertCtrl;
        this.androidPermissions = androidPermissions;
        this.diagnostic = diagnostic;
        this.locationAccuracy = locationAccuracy;
        this.locationPostData = null;
        this.userPostData = {
            "user_id": "",
            "token": "",
            "username": ""
        };
        this.menuCtrl.enable(true);
        var data = JSON.parse(localStorage.getItem('userData'));
        this.userDetails = data.userData;
        this.userPostData = this.userDetails;
        this.feedDataSet = this.getFeed().then(function (success) {
            _this.getPermissions();
            _this.checkLocation();
        });
        this.locationPostData = "";
    }
    HomePage.prototype.checkLocation = function () {
        var _this = this;
        var p = this.diagnostic.isLocationAvailable();
        p.then(function (available) {
            var data = ((available ? "available" : "not available"));
            if (data == "not available") {
                _this.locationAccuracy.canRequest().then(function (canRequest) {
                    if (canRequest) {
                        // the accuracy option will be ignored by iOS
                        _this.locationAccuracy.request(_this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(function (result) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(result.code == 1)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, this.geolocation.getCurrentPosition({ enableHighAccuracy: true, maximumAge: 0 }).then(function (resp) {
                                                var zest = _this.loadctrl.create({
                                                    content: "Enviando ubicación"
                                                });
                                                zest.present();
                                                _this.locationPostData = {
                                                    "lat": resp.coords.latitude,
                                                    "lng": resp.coords.longitude,
                                                    "token": _this.userPostData.token
                                                };
                                                _this.authService.postData(_this.locationPostData, "updateLocation").then(function (result) {
                                                    zest.dismiss();
                                                }).catch(function (err) {
                                                    zest.dismiss();
                                                    _this.checkLocation();
                                                });
                                            }).catch(function (error) {
                                                alert('Hubo un error enviando su ubicación');
                                            })];
                                    case 1:
                                        _a.sent();
                                        _a.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        }); }).catch(function (err) {
                            _this.checkLocation();
                        });
                    }
                });
            }
            else {
                _this.sendLocationWiHighAccuracy().then(function (success) {
                });
            }
        }).catch(function (error) {
            alert('Hubo un error leyendo su ubicación');
        });
    };
    HomePage.prototype.getPermissions = function () {
        var _this = this;
        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.SEND_SMS).
            then(function (result) {
            if (result.hasPermission == false) {
                _this.androidPermissions.requestPermission(_this.androidPermissions.PERMISSION.SEND_SMS).then(function (result) {
                    if (result.hasPermission == false) {
                        var alert_1 = _this.alertCtrl.create({
                            message: 'BSafe necesita permisos de sms para enviar sus alertas',
                            buttons: [
                                {
                                    text: 'Ok',
                                    role: 'destructive',
                                    cssClass: 'secondary',
                                    handler: function (blah) {
                                        _this.getPermissions();
                                    }
                                }
                            ]
                        });
                        alert_1.present();
                        alert_1.onDidDismiss(function (data) {
                            _this.getPermissions();
                            console.log(data);
                        });
                    }
                });
            }
        }).catch(function (err) {
            alert(err);
        });
    };
    HomePage.prototype.sendSOSAlert = function () {
        var _this = this;
        this.sendLocation().then(function (success) {
            var zest = _this.loadctrl.create({
                content: "Enviando Alerta"
            });
            zest.present();
            _this.authService.postData(_this.userPostData, 'sendSOSAlert').then(function (result) {
                _this.resposeData = result;
                if (_this.resposeData.contacts) {
                    zest.dismiss();
                    _this.contactsData = JSON.parse(_this.resposeData.contacts);
                    var data = _this.contactsData;
                    console.log(_this.contactsData);
                    var eachSMS_1 = _this.sms;
                    var sendSMS_1 = [];
                    var options_1 = {
                        replaceLineBreaks: false,
                        android: {
                            intent: '' // send SMS with the native android SMS messaging
                            //intent: '' // send SMS without opening any other app
                        }
                    };
                    data.forEach(function (item) {
                        sendSMS_1.push(item);
                        console.log(item.phone_number, item.message, item.location);
                        eachSMS_1.send(item.phone_number, item.message + ' Me encuentro cerca de ' + item.location, options_1).then(function (result) {
                        });
                    });
                    alert('Su alerta SOS ha sido enviada');
                }
                else {
                    zest.dismiss();
                    alert('Usted no tiene contactos cargados para el envío');
                }
            }).catch(function (error) {
                zest.dismiss();
                alert('Hubo un error enviando datos a la aplicación');
            });
        }).catch(function (err) {
            alert('No pudimos enviar su ubicación');
        });
    };
    HomePage.prototype.sendLocationWiHighAccuracy = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.geolocation.getCurrentPosition({ enableHighAccuracy: true, maximumAge: 0 }).then(function (resp) {
                            var zest = _this.loadctrl.create({
                                content: "Enviando ubicación"
                            });
                            zest.present();
                            _this.locationPostData = {
                                "lat": resp.coords.latitude,
                                "lng": resp.coords.longitude,
                                "token": _this.userPostData.token
                            };
                            _this.authService.postData(_this.locationPostData, "updateLocation").then(function (result) {
                                zest.dismiss();
                            }).catch(function (err) {
                                zest.dismiss();
                                _this.checkLocation();
                            });
                        }).catch(function (error) {
                            alert('Hubo un error enviando su ubicación');
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.sendLocation = function () {
        return __awaiter(this, void 0, void 0, function () {
            var zest;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        zest = this.loadctrl.create({
                            content: "Enviando ubicación"
                        });
                        zest.present();
                        return [4 /*yield*/, this.geolocation.getCurrentPosition().then(function (resp) {
                                zest.dismiss();
                                _this.locationPostData = {
                                    "lat": resp.coords.latitude,
                                    "lng": resp.coords.longitude,
                                    "token": _this.userPostData.token
                                };
                                console.log(_this.locationPostData);
                                _this.authService.postData(_this.locationPostData, "updateLocation").then(function (result) {
                                    zest.dismiss();
                                    if (result) {
                                        _this.getFeed();
                                    }
                                    else {
                                        _this.getFeed();
                                    }
                                });
                            }).catch(function (error) {
                                zest.dismiss();
                                alert('Hubo un error enviando su ubicación');
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.getFeed = function () {
        return __awaiter(this, void 0, void 0, function () {
            var zest;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        zest = this.loadctrl.create({
                            content: "Obteniendo datos"
                        });
                        zest.present();
                        return [4 /*yield*/, this.authService.postData(this.userPostData, "getHome").then(function (result) {
                                _this.resposeData = result;
                                if (_this.resposeData.feedData) {
                                    zest.dismiss();
                                    _this.feedDataSet = (_this.resposeData.feedData);
                                    _this.contactsData = JSON.parse(_this.resposeData.contacts);
                                    console.log(_this.feedDataSet);
                                }
                                else {
                                    zest.dismiss();
                                    console.log("Sin acceso a la app");
                                }
                            }).catch(function (error) {
                                console.log(error);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\ccasanovasgit\bsafe-app\frontApp\src\pages\home\home.html"*/'<ion-header>\n  <ion-navbar class="login-content">\n  <ion-buttons left menuToggle>\n    <button ion-button icon-only>\n      <ion-icon name="menu" style="color:#ffffff; font-size:30px;"></ion-icon>\n    </button>\n  </ion-buttons>\n  <ion-title style="text-align:center; font-family: \'Roboto\'">Inicio</ion-title>\n  </ion-navbar>\n  </ion-header>\n\n<ion-content  no-padding no-margin>\n    <ion-card id="content" *ngIf="feedDataSet != null">\n      <ion-avatar id="profile-info">\n        <img id="profile-image" src="https://cdn.pixabay.com/photo/2018/05/15/17/46/frida-3403761_960_720.jpg">\n      </ion-avatar>\n        <ion-card-content id="quote">\n          <h3 style="color: #f1f1f1; font-family: \'Roboto\'; font-weight: 400; font-size: 16px">{{feedDataSet.quote}}\n            <h6 style="color: #f1f1f1; font-family: \'Roboto\'; font-weight: 400; font-size: 16px">{{feedDataSet.author}}</h6></h3>\n        </ion-card-content>\n\n    </ion-card>\n  <!-- fab placed to the bottom start -->\n  <ion-fab bottom center>\n    <button (click)="sendSOSAlert()" ion-fab color="danger">SOS</button>\n  </ion-fab>\n\n</ion-content>\n'/*ion-inline-end:"C:\ccasanovasgit\bsafe-app\frontApp\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__["a" /* AuthServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_sms__["a" /* SMS */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_android_permissions__["a" /* AndroidPermissions */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_diagnostic__["a" /* Diagnostic */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_location_accuracy__["a" /* LocationAccuracy */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ })

},[217]);
//# sourceMappingURL=main.js.map