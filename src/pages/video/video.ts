import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HobbiesPage } from '../hobbies/hobbies';
import { DashboardPage } from '../dashboard/dashboard';
import { TestimonialPage } from '../testimonial/testimonial';
import { OptionsPage } from '../options/options';
import { ProfilePage } from '../profile/profile';
import { UploadvideoPage } from '../uploadvideo/uploadvideo';

/**
 * Generated class for the VideoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-video',
  templateUrl: 'video.html',
})
export class VideoPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideoPage');
  }

  tohobbies() {
  	this.navCtrl.setRoot(HobbiesPage)
  }
  totestimonial() {
  	this.navCtrl.setRoot(TestimonialPage)
  }
  toDashboard() {
  	this.navCtrl.setRoot(DashboardPage);
  }
  tooption() {
    this.navCtrl.setRoot(OptionsPage)
  }
  touploadvideo() {
    this.navCtrl.push(UploadvideoPage)
  }

  toProfile(){
    this.navCtrl.setRoot(ProfilePage);
  }



  
}
