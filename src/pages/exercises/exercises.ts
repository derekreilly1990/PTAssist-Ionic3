import { Component } from "@angular/core";
import { NavController, ModalController, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { Exercises } from '../../providers/exercises/exercises';
import { Auth } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { VideoModalPage } from '../video-modal/video-modal'
import {AddExerciseModalPage} from "../add-exercise-modal/add-exercise-modal";


@Component({
  selector: 'page-exercises',
  templateUrl: 'exercises.html'
})
export class ExercisesPage {


  loading: any;

  constructor(public navCtrl: NavController,public toastCtrl: ToastController, public exerciseService: Exercises, public modalCtrl: ModalController,
              public alertCtrl: AlertController, public authService: Auth, public loadingCtrl: LoadingController) {

  }


  ionViewDidLoad(){

    this.exerciseService.getExercises();

  }

  deleteExercise(exercise){

    this.showLoader();
    this.exerciseService.deleteExercise(exercise._id).then((result) => {
      this.loading.dismiss();
      let index = this.exerciseService.exercises.indexOf(exercise);
      if(index > -1){
        this.exerciseService.exercises.splice(index, 1);
      }

    }, (err) => {
      this.loading.dismiss();
      let toast = this.toastCtrl.create({
        message: "Not Allowed",
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }

  showLoader(){

    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();

  }
  showVideo(exercise) {

    let modal = this.modalCtrl.create(VideoModalPage,{ video: exercise.video });
    modal.present();
  }
  showAddExerciseModal() {
    let modal = this.modalCtrl.create(AddExerciseModalPage);
    modal.onDidDismiss(() => {
      this.exerciseService.getExercises();
    });
    modal.present();
  }

  logout(){

    this.authService.logout();
    this.navCtrl.setRoot(LoginPage);

  }


}
