import { Component } from '@angular/core';
import { NavController, ModalController, AlertController, LoadingController, ToastController , NavParams } from 'ionic-angular';
import { Auth } from "../../providers/auth/auth";
import {Exercises} from "../../providers/exercises/exercises";
import { ProgramService } from '../../providers/programservice/programservice';
import {VideoModalPage} from "../video-modal/video-modal";
import {ClientService} from "../../providers/clientservice/clientservice";
import {LoginPage} from "../login/login";
import {AddProgramModalPage} from "../add-program-modal/add-program-modal";


@Component({
  selector: 'page-program-view-edit',
  templateUrl: 'program-view-edit.html'
})
export class ProgramViewEditPage {

  selectedProgramid: any;
  selectedProgram: any;
  selectedOptionId: any;
  loading:any;



  constructor(public navCtrl: NavController, public programService: ProgramService, public clientService: ClientService, public toastCtrl: ToastController, public exerciseService: Exercises, public modalCtrl: ModalController,
              public alertCtrl: AlertController, public authService: Auth, public loadingCtrl: LoadingController) {
    this.programService.getTrainersPrograms();
    }

  setSelected(program){
    this.selectedProgram = program;
    this.selectedProgramid = program._id;
  }
  setSelectedOption(){
    this.selectedProgramid = this.selectedOptionId;
    for(let tprog of this.programService.trainerprograms){
      if(tprog._id === this.selectedOptionId){
        this.selectedProgram = tprog;
      }
    }
  }
  showExercises(){
    console.log("selected id ",this.selectedProgram);
  }

  showAddClientProgramModal() {
    let modal = this.modalCtrl.create(AddProgramModalPage);
    modal.onDidDismiss(() => {
      this.programService.getTrainersPrograms()

    });
    modal.present();
  }

  showVideo(exercise) {
    let modal = this.modalCtrl.create(VideoModalPage,{ video: exercise.video });
    modal.present();
  }
  addClientProgram(){
    this.showLoader();
    this.programService.addClientProgram(this.selectedProgram,this.clientService.currentclient._id );
      this.loading.dismiss();
      this.programService.getTrainersPrograms();
    this.clientService.getClientDetails(this.clientService.currentclient._id);

  }
  deleteClientProgram(program_id){
    this.programService.deleteClientProgram(this.clientService.currentclient._id, program_id).then((result) => {
      console.log("Program deleted :" + result);

    },(err) => {
      console.log("error :" + err);
    });
  }
  showLoader(){

    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();

  }
  logout(){
    this.authService.logout();
    this.navCtrl.setRoot(LoginPage);
  }
}
