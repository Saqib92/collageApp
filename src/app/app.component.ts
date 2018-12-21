import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { DashboardPage } from '../pages/dashboard/dashboard';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { globalData } from '../helper/helper';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
headers:any;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private storage: Storage, public http: Http, ) {
    this.getImg();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.checkloginstatus();
    });
  }

  checkloginstatus() {
      this.storage.get("userData").then((val)=>{
        if (val != null) {
          this.rootPage = DashboardPage
        } else {
          this.rootPage = LoginPage;
        }

      })
  }

  getImg(){
    this.headers = {'Content-Type':'application/json'};
      this.http.get(globalData.serviceUrl + 'api_index', {headers: this.headers})
       .map(res => res.json())
       .subscribe(data => {
         console.log(data);
       if(data.status ==true) {
         globalData.logo = data.data.site_logo;
       }
      });
  }
}

