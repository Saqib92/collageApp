import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { globalData } from '../../helper/helper';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the UploadvideoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-uploadvideo',
  templateUrl: 'uploadvideo.html',
})
export class UploadvideoPage {
headers:any;
loader:any;

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	public http: Http, 
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private storage: Storage
    ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadvideoPage');
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


  uploadVideo(title, description){
  	if (title == undefined || title == '') {
  		this.presentToast('Please Enter Title');
  		return false;
  	}
  	if (description == undefined || description == '') {
  		this.presentToast('Please Enter Description');
  		return false;
  	}
  }

}
