import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddcontactmodalPage } from './addcontactmodal';

@NgModule({
  declarations: [
    AddcontactmodalPage,
  ],
  imports: [
    IonicPageModule.forChild(AddcontactmodalPage),
  ],
  exports: [
    AddcontactmodalPage
  ]
})
export class AddcontactmodalPageModule {}
