import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { globalData } from '../../helper/helper';
import { Storage } from '@ionic/storage';
import { HobbiesPage } from '../hobbies/hobbies';
import { TestimonialPage } from '../testimonial/testimonial';
import { VideoPage } from '../video/video';
import { ProfilePage } from '../profile/profile';
import { DashboardPage } from '../dashboard/dashboard';

/**
 * Generated class for the OptionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-options',
  templateUrl: 'options.html',
})
export class OptionsPage {
loader:any;
headers:any;
mydashboardData:any;
oldData:any;
selectedTemp = {};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http, 
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private storage: Storage
    ) {
    this.storage.get('userData').then((val)=>{
      console.log(val);
      this.oldData = val;
      this.dashboardData();
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OptionsPage');
  }
  toHobbies() {
    this.navCtrl.setRoot(HobbiesPage)
  }
  toTestimonital() {
    this.navCtrl.setRoot(TestimonialPage)
  }
  toVideo() {
    this.navCtrl.setRoot(VideoPage)
  }

  toProfile() {
    this.navCtrl.setRoot(ProfilePage);
  }
  tooption() {
    this.navCtrl.setRoot(OptionsPage)
  }

  toDashboard(){
    this.navCtrl.setRoot(DashboardPage)
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }

  presentLoadingDefault() {
    this.loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    this.loader.present();
  }

  dashboardData () {
     this.presentLoadingDefault();
     this.headers = {'Content-Type':'application/json'};
      this.http.get(globalData.serviceUrl + 'templates/index', {headers: this.headers})
       .map(res => res.json())
       .subscribe(data => {
         console.log(data);
       if(data.status ==true) {
          this.mydashboardData = data.data;
         this.loader.dismiss();
       } else {
         this.loader.dismiss();
         this.presentToast(data.message)
       }
      });

  }

  selectTemp(name, id){

    this.selectedTemp.name = name;
    this.selectedTemp.id = id;
    console.log(this.selectedTemp);


  }

}
