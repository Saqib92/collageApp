import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TestimonialPage } from '../testimonial/testimonial';
import { DashboardPage } from '../dashboard/dashboard';
import { VideoPage } from '../video/video';
import { OptionsPage } from '../options/options';
import { ProfilePage } from '../profile/profile';
/**
 * Generated class for the HobbiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hobbies',
  templateUrl: 'hobbies.html',
})
export class HobbiesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HobbiesPage');
  }

  toTestimonital() {
  	this.navCtrl.setRoot(TestimonialPage)
  }
  toProfile() {
    this.navCtrl.setRoot(ProfilePage)
  }
  toDashboard() {
  	this.navCtrl.setRoot(DashboardPage)
  }
  toVideo() {
  	this.navCtrl.setRoot(VideoPage);
  }
  tooption() {
    this.navCtrl.setRoot(OptionsPage)
  }
}
