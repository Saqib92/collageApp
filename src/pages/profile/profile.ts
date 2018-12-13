import { Component } from '@angular/core';
import { NavController, NavParams,ToastController,LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { globalData } from '../../helper/helper';
import { Storage } from '@ionic/storage';
import { HobbiesPage } from '../hobbies/hobbies';
import { TestimonialPage } from '../testimonial/testimonial';
import { VideoPage } from '../video/video';
import { DashboardPage } from '../dashboard/dashboard';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
	oldData: any
	headers: any
	loader: any

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
    })
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

  profileUpdate( first_name, middle_name, last_name, suffix, contact_no, full_address, state, zip_code, country, password, rpassword ) {
  	
  	if(first_name == undefined || first_name == ''){
        this.presentToast("Please Enter Your First Name")
        return false
    }
  	if(middle_name == undefined || middle_name == ''){
        this.presentToast("Please Enter Your Middle Name")
        return false
    }
  	if(last_name == undefined || last_name == ''){
        this.presentToast("Please Enter Your Last Name")
        return false
    }
  	if(suffix == undefined || suffix == ''){
        this.presentToast("Please Enter SUffix")
        return false
    }
  	if(contact_no == undefined || contact_no == ''){
        this.presentToast("Please Enter Your Contact Number")
        return false
    }
  
  	if(full_address == undefined || full_address == ''){
        this.presentToast("Please Enter Your Address")
        return false
    }
  	if(state == undefined || state == ''){
        this.presentToast("Please Enter Your Address")
        return false
    }
  	if(zip_code == undefined || zip_code == ''){
        this.presentToast("Please Enter Zip Code")
        return false
    }
  	if(country == undefined || country == ''){
        this.presentToast("Please Enter Your Country")
        return false
    }
    if(password != rpassword) {
        this.presentToast("Password Not Matched")
       return false
    }

    let profileObject = {
  		first_name: first_name ,
  		middle_name: middle_name,
  		last_name: last_name,
  		suffix: suffix,
  		email: this.oldData.email,
  		password: password,
  		street: '',
  		state: state,
  		zip_code: zip_code,
  		country:country ,
  		contact_no: contact_no,
  		role:'User',
  		profile_pic:''
    }
  	this.presentLoadingDefault();

    	this.headers = {'Content-Type':'application/json'};
    	this.http.post(globalData.serviceUrl + 'user/update/' + this.oldData.id, JSON.stringify(profileObject), {headers: this.headers})
    	.map(res => res.json())
    	.subscribe(data => {
    	  console.log(data);
      	if(data.status ==true) {
      		this.loader.dismiss();
      		this.storage.set("userData", data.data);
      		this.presentToast(data.message);
          this.navCtrl.setRoot(DashboardPage);
      	} else {
      		this.loader.dismiss();
      		this.presentToast(data.message)
      	}
      });
}

toHome(){
  this.navCtrl.setRoot(DashboardPage);
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
