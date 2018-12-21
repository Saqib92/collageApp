import { Component } from '@angular/core';
import { DashboardPage } from '../dashboard/dashboard';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, ActionSheetController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { globalData } from '../../helper/helper';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions, CaptureVideoOptions } from '@ionic-native/media-capture';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
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
confirmName:any;
playVideo:any;
vidUrl:any;
userId:any;
temReturnId:any;
temSelectedId:any;
logo:any;
  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	public http: Http, 
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    private camera: Camera,
    private mediaCapture: MediaCapture,
    public actionSheetCtrl: ActionSheetController,
    private transfer: FileTransfer,
    private file: File
    ) {
    this.logo = globalData.imagesUrl + globalData.logo;
    this.vidUrl = globalData.imagesUrl;
    this.storage.get('userData').then((val)=>{
      console.log(val)
      this.userId = val.id;
      console.log('user ID', this.userId);
    })
    if (globalData.selectedId == '') {
      this.presentToast('Please Select Template from Dashboard');
      this.navCtrl.setRoot(DashboardPage);
    }
    else{
      this.temSelectedId = globalData.selectedId;
      this.temReturnId = globalData.selectedReturnId;
    }
    /*this.storage.get('selectedReturnId').then((val2)=>{
      console.log(val2)
      this.temReturnId = val2;
      console.log(this.temReturnId)
    })
    this.storage.get('selectedId').then((val3)=>{
      console.log(val3)
      this.temSelectedId = val3;
      if(this.temSelectedId == null){
        this.presentToast('Please Select Template First');
        return false;
      }
      console.log(this.temSelectedId)
    })*/

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

/*  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Upload Intro Video',
      buttons: [
        {
          text: 'Chose From Gallery',
          handler: () => {
            console.log('Gallery clicked');
            this.chooseVideo();
          }
        },
        {
          text: 'Open Camera',
          handler: () => {
            console.log('Camera clicked');
            this.captureVideo();
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
  }*/


/*  captureVideo(){
    let options: CaptureVideoOptions = { limit: 1, duration: 10 };
    this.mediaCapture.captureVideo(options)
      .then(
        (data: MediaFile[]) => {
          console.log('After Recording ' + JSON.stringify(data));
          console.log((data[0].fullPath));
          this.uploadVideo(JSON.stringify(data[0].fullPath));
        },
        (err: CaptureError) => console.error(err)
      );
  }*/

  chooseVideo(t, d){
      const options: CameraOptions = {
        quality: 10,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.VIDEO,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
      }

      this.camera.getPicture(options).then((imageData) => {
          // imageData is either a base64 encoded string or a file URI
          // If it's base64 (DATA_URL):
          this.confirmName = imageData
          console.log(this.confirmName);
          if (this.confirmName != undefined) {
            this.uploadVideo(this.confirmName, t, d);
          }
        }, (err) => {
        // Handle error
      });
  }

  uploadVideo(path, t, d) {
  const fileTransfer: FileTransferObject = this.transfer.create();
    let options: FileUploadOptions = {
        fileKey: 'file',
        fileName: '.mp4',
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
          this.playVideo = res.data;
          this.loader.dismiss();
          this.saveVideo(t, d, this.confirmName);
          console.log('returened Video name: ' +this.confirmName);
      }
      //this.loader.dismiss();
      
    }, (err) => {
      console.log(err);
      this.loader.dismiss();
      this.presentToast(err);
    });
}

saveVideo(t, d, f){

if(this.temSelectedId == null){
        this.presentToast('Please Select Template First');
        return false;
}
  let videoObj = {
    user_id: this.userId,
    template_id: this.temSelectedId,
    user_template_id: this.temReturnId,
    title: t,
    description: d,
    video: f
  }
  this.presentLoadingDefault();

    this.headers = {'Content-Type':'application/json'};
      this.http.post(globalData.serviceUrl + 'video/store', JSON.stringify(videoObj), {headers: this.headers})
       .map(res => res.json())
       .subscribe(data => {
         console.log(data);
       if(data.status ==true) {
         this.loader.dismiss();
         this.presentToast(data.message)
        
       } else {
         this.loader.dismiss();
         this.presentToast(data.message)
       }
      });
}

  addVideo(title, description){
  	if (title == undefined || title == '') {
  		this.presentToast('Please Enter Title');
  		return false;
  	}
  	if (description == undefined || description == '') {
  		this.presentToast('Please Enter Description');
  		return false;
  	}

   // this.presentActionSheet();
    this.chooseVideo(title, description);

  }

}
