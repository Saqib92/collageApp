import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { globalData } from '../../helper/helper';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  singupData: any
  headers: any
  loader: any

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http, 
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  toLogin(){
  	this.navCtrl.setRoot(LoginPage);
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

  signup(fname, mname, lname, email, password, rpassword) {
    if(fname == undefined || fname == ''){
        this.presentToast("Please Enter Your First Name")
        return false
    }
    if(mname == undefined || mname == ''){
        this.presentToast("Please Enter Your Middle Name")
        return false
    }
    if(lname == undefined || lname == ''){
        this.presentToast("Please Enter Your Last Name")
        return false
    }
    if(email == undefined || email == ''){
        this.presentToast("Please Enter Your Email Address")
        return false
    }
    if(password == undefined || password == ''){
        this.presentToast("Please Enter Your Password")
        return false
    }
    if(rpassword == undefined || rpassword == ''){
        this.presentToast("Please Enter Your Confirm Password")
        return false
    }
    if(password != rpassword) {
        this.presentToast("Password Not Matched")
       return false
    }

    let signupObject = {
      first_name:fname,
      middle_name:mname,
      last_name:lname,
      suffix:'xyz',
      email:email,
      password:password,
      street:"xyz",
      state:"xyz",
      zip_code:"xyz",
      country:"xyz",
      contact_no:"",
      role:"User",
      profile_pic: ""
    }


    this.presentLoadingDefault();

    this.headers = {'Content-Type':'application/json'};
    this.http.post(globalData.serviceUrl + 'user/register', JSON.stringify(signupObject), {headers: this.headers})
     .map(res => res.json())
     .subscribe(data => {
       console.log(data);
     if(data.status ==true) {
       this.loader.dismiss();
       this.presentToast(data.message);
       this.navCtrl.pop();
     } else {
       this.loader.dismiss();
       this.presentToast(data.message)
     }
    });

  }

}
