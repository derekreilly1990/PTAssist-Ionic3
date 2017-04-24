import { Component } from '@angular/core';
import { Auth } from '../../providers/auth/auth';
import { NavController , ModalController, AlertController, LoadingController, ViewController, ToastController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { ClientService } from '../../providers/clientservice/clientservice'


@Component({
  selector: 'page-add-client',
  templateUrl: 'add-client.html'
})
export class AddClientPage {



  clientform : FormGroup;
  loading: any;


  constructor(public storage: Storage, public clientService: ClientService, public toastCtrl: ToastController, public navCtrl: NavController,public viewCtrl: ViewController, private formBuilder: FormBuilder,public modalCtrl: ModalController,
              public alertCtrl: AlertController, public authService: Auth, public loadingCtrl: LoadingController) {


    this.clientform = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['',Validators.required],
      role: ['client'],
      trainer: [this.authService.user._id],
      name:['',Validators.required],

    });

  }
  registerClient(){


    let details = this.clientform.value;
    //details.patchValue({trainer: this.authService.user._id});
    console.log(details);
    this.clientService.createClientAccount(details).then((result) => {

      console.log("client created");
      this.dismiss();
    }, (err) => {

      console.log("not allowed");
      this.dismiss();


    });





  }

  showLoader(){

    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();

  }
  dismiss() {
    this.viewCtrl.dismiss()
  }
}
