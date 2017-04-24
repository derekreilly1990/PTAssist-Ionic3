import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Exercises } from '../providers/exercises/exercises';
import {AddClientPage} from "../pages/add-client/add-client";
import {AddClientProgramModalPage} from "../pages/add-client-program-modal/add-client-program-modal";
import {AddExerciseModalPage} from "../pages/add-exercise-modal/add-exercise-modal";
import {AddProgramModalPage} from "../pages/add-program-modal/add-program-modal";
import {ClientDetailPage} from "../pages/client-detail/client-detail";
import {ClientDietPage} from "../pages/client-diet/client-diet";
import {ClientListPage} from "../pages/client-list/client-list";
import {ClientProgramViewPage} from "../pages/client-program-view/client-program-view";
import {ClientStatsPage} from "../pages/client-stats/client-stats";
import {ClientViewHomePage} from "../pages/client-view-home/client-view-home";
import {ExercisesPage} from "../pages/exercises/exercises";
import {HomeClientPage} from "../pages/home-client/home-client";
import {LoginPage} from "../pages/login/login";
import {ProgramListPage} from "../pages/program-list/program-list";
import {ProgramViewEditPage} from "../pages/program-view-edit/program-view-edit";
import {ResetPasswordPage} from "../pages/reset-password/reset-password";
import {SignupPage} from "../pages/sign-up/sign-up";
import {VideoModalPage} from "../pages/video-modal/video-modal";
import { Auth } from '../providers/auth/auth';
import {ClientService} from "../providers/clientservice/clientservice";
import { ProgramService } from '../providers/programservice/programservice';
import { IonicStorageModule } from '@ionic/storage';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'cd409bb9'
  }
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddClientPage,
    AddClientProgramModalPage,
    AddExerciseModalPage,
    AddProgramModalPage,
    ClientDetailPage,
    ClientDietPage,
    ClientListPage,
    ClientProgramViewPage,
    ClientStatsPage,
    ClientViewHomePage,
    ExercisesPage,
    HomeClientPage,
    LoginPage,
    ProgramListPage,
    ProgramViewEditPage,
    ResetPasswordPage,
    SignupPage,
    VideoModalPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    CloudModule.forRoot(cloudSettings),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddClientPage,
    AddClientProgramModalPage,
    AddExerciseModalPage,
    AddProgramModalPage,
    ClientDetailPage,
    ClientDietPage,
    ClientListPage,
    ClientProgramViewPage,
    ClientStatsPage,
    ClientViewHomePage,
    ExercisesPage,
    HomeClientPage,
    LoginPage,
    ProgramListPage,
    ProgramViewEditPage,
    ResetPasswordPage,
    SignupPage,
    VideoModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}, Exercises , Auth , ClientService, ProgramService
  ]
})
export class AppModule {}
