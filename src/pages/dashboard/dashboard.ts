import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { globalData } from '../../helper/helper';
import { Storage } from '@ionic/storage';
import { HobbiesPage } from '../hobbies/hobbies';
import { TestimonialPage } from '../testimonial/testimonial';
import { VideoPage } from '../video/video';
import { OptionsPage } from '../options/options';
import { ProfilePage } from '../profile/profile';
import { LoginPage } from '../login/login';
import { UploadvideoPage } from '../uploadvideo/uploadvideo';


/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  oldData: any;
  headers: any;
  loader: any;
  mydashboardData: any;
  selectedTemp = {id:''};

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http, 
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private storage: Storage
    ) {
    this.storage.get('userData').then((val)=>{
      this.oldData = val;
      console.log(val);
      this.dashboardData(val.id);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }
  toHobbies() {
    this.navCtrl.setRoot(HobbiesPage)
  }
  toTestimonial() {
    this.navCtrl.setRoot(TestimonialPage)
  }
  toVideo() {
    this.navCtrl.setRoot(VideoPage)
  }

  toOption() {
    this.navCtrl.setRoot(OptionsPage)
  }
  toProfile() {
    this.navCtrl.setRoot(ProfilePage)
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

  dashboardData (id) {
     this.presentLoadingDefault();
     this.headers = {'Content-Type':'application/json'};
      this.http.get(globalData.serviceUrl + 'user_template/index/'+id, {headers: this.headers})
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

  deleteMyTemplate(id){
    console.log(id);
    //this.presentLoadingDefault();
     this.headers = {'Content-Type':'application/json'};
      this.http.get(globalData.serviceUrl + 'user_template/delete/'+id, {headers: this.headers})
       .map(res => res.json())
       .subscribe(data => {
         console.log(data);
       if(data.status ==true) {
         //this.loader.dismiss();
         this.dashboardData(this.oldData.id);
         this.presentToast(data.message);
       } else {
         //this.loader.dismiss();
         this.presentToast(data.message)
       }
      });
  }

  selectTemp(id, sId){
    this.selectedTemp.id =  id;
    globalData.selectedReturnId = id;
    globalData.selectedId = sId;
    console.log(id);
  }
  deSelectTemp(){
    this.selectedTemp.id = '';
    console.log('delecect')
    globalData.selectedReturnId = ''
    ;
    globalData.selectedId = '';
  }

  logout() {
    this.storage.clear();
    this.navCtrl.setRoot(LoginPage)
  }

}
