import { Component } from '@angular/core';
import { NavController, LoadingController , ToastController} from 'ionic-angular';
import { Auth } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { SignupPage } from '../sign-up/sign-up';
import {ClientViewHomePage} from "../client-view-home/client-view-home";
import {ClientService} from "../../providers/clientservice/clientservice";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  email: string;
  password: string;
  loading: any;
  client: any;

  constructor(public navCtrl: NavController,public toastCtrl: ToastController, public authService: Auth, public clientService: ClientService, public loadingCtrl: LoadingController) {

  }

  ionViewDidLoad() {

    this.showLoader();

    //Check if already authenticated
    this.authService.checkAuthentication().then((res) => {
      console.log("Already authorized");
      this.loading.dismiss();
      this.SetHomePage(this.authService.user.role);
    }, (err) => {
      let toast = this.toastCtrl.create({
        message: 'Not already authorized',
        duration: 3000,
        position: 'top'
      });
      toast.present();
      this.loading.dismiss();
    });

  }

  login(){

    this.showLoader();

    let credentials = {
      email: this.email,
      password: this.password
    };

    this.authService.login(credentials).then((result) => {
      this.loading.dismiss();


      console.log("login role", this.authService.user.role);
      this.SetHomePage(this.authService.user.role);
    }, (err) => {
      this.loading.dismiss();
      let toast = this.toastCtrl.create({
        message: err,
        duration: 3000,
        position: 'top'
      });
      toast.present();
      console.log(err);
    });

  }

  launchSignup(){
    this.navCtrl.push(SignupPage);
  }
  SetHomePage(role){

    if(role === 'client') {
      this.clientService.getClientDetails(this.authService.user._id);
      this.authService.isclient = true;
    }
    if(role === 'trainer') {
      this.navCtrl.setRoot(HomePage);



    }else{
      console.log("role ",role);
        this.clientService.getClientDetails(this.authService.user._id);
        this.navCtrl.setRoot(ClientViewHomePage);


    }

  }

  showLoader(){

    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();

  }

}
