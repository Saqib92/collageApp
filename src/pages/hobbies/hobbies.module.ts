import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HobbiesPage } from './hobbies';

@NgModule({
  declarations: [
    HobbiesPage,
  ],
  imports: [
    IonicPageModule.forChild(HobbiesPage),
  ],
})
export class HobbiesPageModule {}
