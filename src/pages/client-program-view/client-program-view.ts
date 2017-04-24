import { Component } from '@angular/core';
import { NavController, ModalController, AlertController, LoadingController, ToastController , NavParams } from 'ionic-angular';
import {Auth} from "../../providers/auth/auth";
import {Exercises} from "../../providers/exercises/exercises";
import { ProgramService } from '../../providers/programservice/programservice';
import {VideoModalPage} from "../video-modal/video-modal";
import {ClientService} from "../../providers/clientservice/clientservice";


/*
  Generated class for the ClientProgramView page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-client-program-view',
  templateUrl: 'client-program-view.html'
})
export class ClientProgramViewPage {

  exercises: any;
  selectedProgramid: any;
  selectedProgram: any;
  program_exercises: any;
  loading:any;


  constructor(public navCtrl: NavController, public programService: ProgramService, public toastCtrl: ToastController, public exerciseService: Exercises, public modalCtrl: ModalController,
              public alertCtrl: AlertController, public authService: Auth, public loadingCtrl: LoadingController, public navParams: NavParams,public clientService: ClientService) {









  }
  ionViewDidLoad(){




  }
  setSelected(program){
    this.selectedProgram = program;
    this.selectedProgramid = program._id;
  }

  showVideo(exercise) {
    let modal = this.modalCtrl.create(VideoModalPage,{ video: exercise.video });
    modal.present();
  }

  showLoader(){

    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();

  }
}
