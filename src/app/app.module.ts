import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { OptionsPage } from '../pages/options/options';
import { TemplatePage } from '../pages/template/template';
import { TabsPage } from '../pages/tabs/tabs';
import { HobbiesPage } from '../pages/hobbies/hobbies';
import { TestimonialPage } from '../pages/testimonial/testimonial';
import { VideoPage } from '../pages/video/video';
import { ProfilePage } from '../pages/profile/profile';
import { UploadvideoPage } from '../pages/uploadvideo/uploadvideo';
import { IonicStorageModule } from '@ionic/storage';
import { MediaCapture} from '@ionic-native/media-capture';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DashboardPage,
    LoginPage, 
    OptionsPage,
    TemplatePage,
    TabsPage,
    HobbiesPage,
    TestimonialPage,
    VideoPage,
    SignupPage,
    ProfilePage,
    UploadvideoPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DashboardPage,
    LoginPage, 
    OptionsPage,
    TemplatePage,
    TabsPage,
    HobbiesPage,
    TestimonialPage,
    VideoPage,
    SignupPage,
    ProfilePage,
    UploadvideoPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    MediaCapture,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
