import { Component } from '@angular/core';
import {
  NavController, NavParams, LoadingController, AlertController, ModalController,
  ToastController
} from 'ionic-angular';
import {Auth} from "../../providers/auth/auth";
import {Exercises} from "../../providers/exercises/exercises";
import {ClientService} from "../../providers/clientservice/clientservice";
import {ProgramService} from "../../providers/programservice/programservice";

/*
  Generated class for the ClientDiet page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-client-diet',
  templateUrl: 'client-diet.html'
})
export class ClientDietPage {
  latestdiet: any;

  constructor(public navCtrl: NavController, public programService: ProgramService, public clientService: ClientService, public toastCtrl: ToastController, public exerciseService: Exercises, public modalCtrl: ModalController,
              public alertCtrl: AlertController, public authService: Auth, public loadingCtrl: LoadingController, public navParams: NavParams) {

      this.latestdiet = this.clientService.currentclient.diet[this.clientService.currentclient.diet.length -1];




  }

  ionViewDidLoad() {

  }
  showDietPrompt() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Update Diet');
    alert.setMessage('Enter Calories, Protein(%), Fats(%), Carbs(%), Fiber(grams) ');


    alert.addInput({
      name: 'calories',
      type: 'number',
      label: 'Calories',

    });
    alert.addInput({
      name: 'protein',
      type: 'number',
      label: 'Protein(%)',

    });
    alert.addInput({
      name: 'fats',
      type: 'number',


    });
    alert.addInput({
      name: 'carbs',
      type: 'number',
      label: 'Carbs(%)'

    });
    alert.addInput({
      name: 'fiber',
      type: 'number',
      label: 'Fiber(grams)'

    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Enter',
      handler: data => {
        this.clientService.addClientDiet(data, this.clientService.currentclient).then((data) => {

          this.clientService.getClientDetails(this.clientService.currentclient._id);
          this.latestdiet = this.clientService.currentclient.diet[this.clientService.currentclient.diet.length -1];

        }, (err) => {
          console.log("error" + err);
        });


      }
    });
    alert.present();
  }

}
