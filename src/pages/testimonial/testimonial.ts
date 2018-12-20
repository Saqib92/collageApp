import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,LoadingController  } from 'ionic-angular';
import { HobbiesPage } from '../hobbies/hobbies';
import { DashboardPage } from '../dashboard/dashboard';
import { VideoPage } from '../video/video';
import { ProfilePage } from '../profile/profile';
import { OptionsPage } from '../options/options';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { globalData } from '../../helper/helper';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the TestimonialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-testimonial',
  templateUrl: 'testimonial.html',
})
export class TestimonialPage {
loader:any;
header:any;
userId:any;
temReturnId:any;
temSelectedId:any;
headers:any;
oldTestimonials:any;
imgUrl:any;
selectedTemp = {id:'', rid:''};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http, 
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private storage: Storage
    ) {
    this.imgUrl = globalData.imagesUrl;

    this.storage.get('userData').then((val)=>{
      console.log(val)
      this.userId = val.id;
      this.getTestimonial(this.userId);
      console.log('user ID', this.userId);
    })

   /* this.temSelectedId = globalData.selectedId;
    this.temReturnId = globalData.selectedReturnId;
    this.storage.get('selectedReturnId').then((val2)=>{
      console.log(val2)
      this.temReturnId = val2;
      console.log(this.temReturnId)
    })
    this.storage.get('selectedId').then((val3)=>{
      console.log(val3)
      this.temSelectedId = val3;
      console.log(this.temSelectedId)
    })*/
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestimonialPage');
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
  toDashboard(){
  	this.navCtrl.setRoot(DashboardPage)
  }
  toVideo() {
  	this.navCtrl.setRoot(VideoPage);
  }
  tooption() {
  	this.navCtrl.setRoot(OptionsPage)
  }
  toProfile(){
    this.navCtrl.setRoot(ProfilePage);
  }

  getTestimonial(id){
    this.presentLoadingDefault();
    this.headers = {'Content-Type':'application/json'};
      this.http.get(globalData.serviceUrl + 'user_template/index/'+ id, {headers: this.headers})
       .map(res => res.json())
       .subscribe(data => {
         console.log(data);
       if(data.status ==true) {
         this.oldTestimonials = data.data;
         this.loader.dismiss();
         this.presentToast(data.message);
       } else {
         this.loader.dismiss();
         this.presentToast(data.message)
       }
    });
  }

  ValidateEmail(mail){
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
      return (true)
    }
      this.presentToast("You have entered an invalid email address!")
      return (false)
  }


  storeTestimonial(name, email, comment){
    if (name == undefined || name == '') {
      this.presentToast('Please Enter Name');
      return false;
    }
     let check = this.ValidateEmail(email);
     if (check == false) {
       return false;
     }
    if (comment == undefined || comment == '') {
      this.presentToast('Please Enter Comment');
      return false;
    }
      if (this.selectedTemp.id == "") {
      this.presentToast('Please Select Template First');
     // this.toDashboard();
      return false;
    }  

    let testObj = {
      user_id: this.userId,
      template_id: this.selectedTemp.rid,
      user_template_id: this.selectedTemp.id,
      name: name,
      email: email,
      description: comment
    }

     this.presentLoadingDefault();
     this.headers = {'Content-Type':'application/json'};
      this.http.post(globalData.serviceUrl + 'testimonial/store', JSON.stringify(testObj),{headers: this.headers})
       .map(res => res.json())
       .subscribe(data => {
         console.log(data);
       if(data.status ==true) {
         this.loader.dismiss();
         this.presentToast(data.message);
       } else {
         this.loader.dismiss();
         this.presentToast(data.message)
       }
      });

  }

  selectTemp(id, sId){
    this.selectedTemp.id =  id;
    this.selectedTemp.rid = sId;
    // globalData.selectedReturnId = id;
    // globalData.selectedId = sId;
    console.log(id, sId);
  }
  deSelectTemp(){
    this.selectedTemp.id = '';
    this.selectedTemp.rid = '';
    console.log('delecect')
    // globalData.selectedReturnId = ''
    // ;
    // globalData.selectedId = '';
  }

}
