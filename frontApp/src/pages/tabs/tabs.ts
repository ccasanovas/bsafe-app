import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import {HomePage} from "../home/home";
import {ContactsPage} from "../contacts/contacts";
import {MyprofilePage} from "../myprofile/myprofile";

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MyprofilePage;
  tab3Root = ContactsPage;

  public userDetails : any;
  public resposeData : any;
  public dataSet : any;
  public feedDataSet : any;

  userPostData = {
    "user_id": "",
    "token": "",
  };

  constructor( public authService : AuthServiceProvider, public navCtrl: NavController, private menuCtrl: MenuController) {
    this.menuCtrl.enable(true);
    const data = JSON.parse(localStorage.getItem('userData'));
    JSON.parse(localStorage.getItem('feedData'));
    this.userDetails = data.userData;
    this.userPostData = this.userDetails;
  }

}
