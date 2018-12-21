import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { SignupPage } from '../signup/signup';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { globalData } from '../../helper/helper';
import { Storage } from '@ionic/storage';



/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({ 
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginData: any
  headers: any
  loader: any
  imgUrl :any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http, 
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private storage: Storage
  ){
    this.getImg();    
    console.log(this.imgUrl);  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
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
  getImg(){
    this.headers = {'Content-Type':'application/json'};
      this.http.get(globalData.serviceUrl + 'api_index', {headers: this.headers})
       .map(res => res.json())
       .subscribe(data => {
         console.log(data);
       if(data.status ==true) {
         globalData.logo = data.data.site_logo;
         this.imgUrl = globalData.imagesUrl + globalData.logo;
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

  login(useremail,password){
    let check = this.ValidateEmail(useremail);
         if (check == false) {
           return false;
         }

    if(useremail == undefined || useremail == ''){
        this.presentToast("Please Enter Your Email")
        return false
    }
    
    if(password == undefined || password == ''){
        this.presentToast("Please Enter Your Password")
        return false
    }

    let loginObject = {
      email:useremail,
      password:password
    }

    this.presentLoadingDefault();

    this.headers = {'Content-Type':'application/json'};
      this.http.post(globalData.serviceUrl + 'user/login', JSON.stringify(loginObject), {headers: this.headers})
       .map(res => res.json())
       .subscribe(data => {
         console.log(data);
       if(data.status ==true) {
         this.loginData == data.data;
         this.storage.set('userData',data.data);
         this.loader.dismiss();
         this.presentToast(data.message);
         this.navCtrl.setRoot(DashboardPage);
       } else {
         this.loader.dismiss();
         this.presentToast(data.message)
       }
      });
  }

  toSignup(){
    this.navCtrl.push(SignupPage);
  }

}
