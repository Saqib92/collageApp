import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { HobbiesPage } from '../hobbies/hobbies';
import { DashboardPage } from '../dashboard/dashboard';
import { TestimonialPage } from '../testimonial/testimonial';
import { OptionsPage } from '../options/options';
import { ProfilePage } from '../profile/profile';
import { UploadvideoPage } from '../uploadvideo/uploadvideo';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { globalData } from '../../helper/helper';
import { Storage } from '@ionic/storage';
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
loader:any;
headers:any;
myVids:any;
vidUrl:any;
logo:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http, 
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private storage: Storage
    )  {
    this.myVids = [];
    this.logo = globalData.imagesUrl + globalData.logo;
    this.vidUrl = globalData.imagesUrl;
    this.storage.get('userData').then((val)=>{
      this.getVideos(val.id);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideoPage');
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

  getVideos(id){

    this.presentLoadingDefault();
    this.headers = {'Content-Type':'application/json'};
      this.http.get(globalData.serviceUrl + 'video/index/'+id, {headers: this.headers})
       .map(res => res.json())
       .subscribe(data => {
         console.log(data);
       if(data.status ==true) {
         this.myVids = data.data;
         this.loader.dismiss();
         this.presentToast(data.message);

       } else {
         this.loader.dismiss();
         this.presentToast(data.message)
       }
      });

  }

  
}
