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
selectedTemp = {name:'', id: ''};
email:boolean;
address1:boolean;
address2:boolean;
myphone:boolean;
fb:boolean;
twitter:boolean;
google:boolean;
linkedin:boolean;
pin:boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http, 
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private storage: Storage
    ) {

    this.email = true;
    this.address1 = true;
    this.address2 = true;
    this.myphone = true;
    this.fb = true;
    this.twitter = true;
    this.google = true;
    this.linkedin = true;
    this.pin = true;

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
    if (name == undefined || name == '') {
      this.presentToast('Please Enter Template Name');
      return false;
    }
    else{
      this.selectedTemp.name = name;  
      this.selectedTemp.id = id;
    }
    
    
    console.log(this.selectedTemp);


  }

  createTemplate(email, address, address2, myphone, fb, twitter, google, linkedin, pin){
    if(this.selectedTemp.id == ''){
      this.presentToast('Please Select Template');
      return false;
    } 

/*
    let createTempObj = {
      user_id: this.oldData.id,
      template_id: this.selectedTemp.id,
      temp_name: this.selectedTemp.name
    }*/
    let createTempObj ={
                    user_id: '',
                    template_id: '',
                    temp_name: '',
                    email: '',
                    address_1: '',
                    address_2: '',
                    phone_no: '',
                    facebook: '',
                    twitter: '',
                    google_plus: '' ,
                    linkedin: '',
                    pintrest: ''
};
createTempObj.user_id = this.oldData.id;
createTempObj.template_id = this.selectedTemp.id;
createTempObj.temp_name = this.selectedTemp.name;

  if (this.email == true) {
     createTempObj.email= this.oldData.email
  }
  if (this.address1== true) {
     createTempObj.address_1 = this.oldData.address_1
  }
  if (this.address2 == true) {
     createTempObj.address_2 = this.oldData.address_2
  }
  if (this.myphone == true) {
     createTempObj.phone_no = this.oldData.contact_no
  }
  if (this.fb == true) {
     createTempObj.facebook = this.oldData.facebook
  }
  if (this.twitter == true) {
     createTempObj.twitter = this.oldData.twitter
  }
  if (this.google == true) {
     createTempObj.google_plus = this.oldData.google_plus
  }
  if (this.linkedin == true) {
     createTempObj.linkedin = this.oldData.linkedin
  }
  if (this.pin == true) {
     createTempObj.pintrest = this.oldData.pintrest
  }


console.log(createTempObj);
    //this.storage.set('selectedId', this.selectedTemp.id);
    globalData.selectedId = this.selectedTemp.id;

    this.presentLoadingDefault();
     this.headers = {'Content-Type':'application/json'};
      this.http.post(globalData.serviceUrl + 'user_template/store', JSON.stringify(createTempObj), {headers: this.headers})
       .map(res => res.json())
       .subscribe(data => {
         console.log(data);
       if(data.status ==true) {
         //this.storage.set('selectedReturnId', data.data.id);
         globalData.selectedReturnId = data.data.id;
         this.loader.dismiss();
         this.navCtrl.push(TestimonialPage);
         this.presentToast(data.message);
       } else {
         this.loader.dismiss();
         this.presentToast(data.message)
       }
      });
  }

}
