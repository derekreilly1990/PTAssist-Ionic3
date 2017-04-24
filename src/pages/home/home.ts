import { Component } from '@angular/core';
import { ClientListPage } from '../client-list/client-list';
import { NavController, NavParams , ModalController,AlertController, LoadingController, ToastController} from 'ionic-angular';
import { Auth } from '../../providers/auth/auth' ;
import { Storage } from '@ionic/storage';
import {LoginPage} from "../login/login";
import { ExercisesPage } from '../exercises/exercises'
import {AddClientPage} from "../add-client/add-client";
import {ProgramListPage} from "../program-list/program-list";
import {ClientService} from "../../providers/clientservice/clientservice";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  trainerId: any;
  trainerName: any;
  constructor(public storage: Storage, public navCtrl: NavController, public toastCtrl: ToastController, public auth: Auth, public  navParams: NavParams,
              public modalCtrl: ModalController, public clientService: ClientService) {

    this.clientService.getClients();

  }


  goToClientList(){
    this.navCtrl.push(ClientListPage, {
      trainerId : this.auth,
    });
  }
  goToExerciseList(){
    this.navCtrl.push(ExercisesPage);
  }
  goToProgramList(){
    this.navCtrl.push(ProgramListPage);
  }
  logOut() {
    this.auth.logout();
    this.navCtrl.setRoot(LoginPage);
  }
  showAddClientModal() {
    let modal = this.modalCtrl.create(AddClientPage);


    modal.present();
  }


}
