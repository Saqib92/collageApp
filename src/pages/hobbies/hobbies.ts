import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, ActionSheetController } from 'ionic-angular';
import { TestimonialPage } from '../testimonial/testimonial';
import { DashboardPage } from '../dashboard/dashboard';
import { VideoPage } from '../video/video';
import { OptionsPage } from '../options/options';
import { ProfilePage } from '../profile/profile';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { globalData } from '../../helper/helper';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
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
loader:any;
header:any;
confirmName:any;
imgUrl:any;
userId:any;
headers:any;
myHobbies:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http, 
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    private camera: Camera,
    public actionSheetCtrl: ActionSheetController,
    private transfer: FileTransfer,
    private file: File
    ) {

    this.imgUrl = globalData.imagesUrl;

    this.storage.get('userData').then((val)=>{
      this.userId = val.id;
      this.getUserhoby(this.userId);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HobbiesPage');
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


   presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Upload Image',
      buttons: [
        {
          text: 'Chose From Gallery',
          handler: () => {
            console.log('Gallery clicked');
            this.choosePhoto();
          }
        },
        {
          text: 'Open Camera',
          handler: () => {
            console.log('Camera clicked');
            this.takePhoto();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  choosePhoto(){

    const options: CameraOptions = {
        quality: 50,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.PNG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
      }

      this.camera.getPicture(options).then((imageData) => {
          // imageData is either a base64 encoded string or a file URI
          // If it's base64 (DATA_URL):
          this.confirmName = imageData;
          console.log(this.confirmName);
          if (this.confirmName != undefined) {
            this.uploadPhoto(this.confirmName);
          }
        }, (err) => {
        // Handle error
      });

  }

  takePhoto(){
     const options: CameraOptions = {
        quality: 50,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.PNG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: this.camera.PictureSourceType.CAMERA
      }

      this.camera.getPicture(options).then((imageData) => {
          // imageData is either a base64 encoded string or a file URI
          // If it's base64 (DATA_URL):
          this.confirmName = imageData;
          console.log(this.confirmName);
          if (this.confirmName != undefined) {
            this.uploadPhoto(this.confirmName);
          }
        }, (err) => {
        // Handle error
      });
  }

  uploadPhoto(path){
  const fileTransfer: FileTransferObject = this.transfer.create();
    let options: FileUploadOptions = {
        fileKey: 'file',
        fileName: '.png',
        chunkedMode: false,
        //mimeType: "image/jpeg",
      }

    this.presentLoadingDefault();
    fileTransfer.upload(path, globalData.serviceUrl + 'upload_file', options)
      .then((data) => {
      console.log(data+" Uploaded Successfully");
      console.log(JSON.parse(data.response));
      let res = JSON.parse(data.response);
      if (res.status == true) {
          this.confirmName = res.data;
          console.log('returened Video name: ' +this.confirmName);
      }
      this.loader.dismiss();
      
    }, (err) => {
      console.log(err);
      this.loader.dismiss();
      this.presentToast(err);
    });
  }


  getUserhoby(id){
    this.presentLoadingDefault();
    this.headers = {'Content-Type':'application/json'};
    this.http.get(globalData.serviceUrl + 'hobbies/index/'+ id, {headers: this.headers})
     .map(res => res.json())
     .subscribe(data => {
       console.log(data);
     if(data.status ==true) {
       this.myHobbies = data.data;
       this.loader.dismiss();
       this.presentToast(data.message);      
     } else {
       this.loader.dismiss();
       this.presentToast(data.message)
     }
    });
  }


  saveHobby(name, description){
    if (name == undefined || name == '') {
      this.presentToast('Please Enter Hobby');
      return false
    }
    if (description == undefined || description == '') {
      this.presentToast('Please Enter Description');
      return false
    }
    if (this.confirmName == undefined || this.confirmName == '') {
      this.presentToast('Please Upload Image');
      return false
    }

    let hobbyObj = {
      user_id: this.userId,
      title: name ,
      description: description,
      video: this.confirmName
    }


    this.presentLoadingDefault();

    this.headers = {'Content-Type':'application/json'};
    this.http.post(globalData.serviceUrl + 'hobbies/store', JSON.stringify(hobbyObj), {headers: this.headers})
     .map(res => res.json())
     .subscribe(data => {
       console.log(data);
     if(data.status ==true) {
       this.loader.dismiss();
       this.getUserhoby(this.userId);
       this.presentToast(data.message)
      
     } else {
       this.loader.dismiss();
       this.presentToast(data.message)
     }
    });

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
