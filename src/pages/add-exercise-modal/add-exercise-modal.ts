import { Component } from '@angular/core';
import { NavController , ModalController, AlertController, LoadingController, ViewController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Auth } from '../../providers/auth/auth';
import { Exercises } from '../../providers/exercises/exercises';


/*
  Generated class for the AddExerciseModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-exercise-modal',
  templateUrl: 'add-exercise-modal.html'
})
export class AddExerciseModalPage {

  loading: any;
  exercise : FormGroup;
  newExercise : any;

  constructor(public navCtrl: NavController,public viewCtrl: ViewController,public exerciseService: Exercises, private formBuilder: FormBuilder,public modalCtrl: ModalController,
              public alertCtrl: AlertController, public authService: Auth, public loadingCtrl: LoadingController) {
    this.exercise = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['',Validators.required],
      video: ['',Validators.required],
      image:['',Validators.required],
    });
  }
  addExercise(){
    this.showLoader();
    this.newExercise = this.exercise.value;
    this.exerciseService.createExercise(this.newExercise).then((result) => {
      this.loading.dismiss();
      //this.exercises = result;
      console.log("exercise created");
      this.viewCtrl.dismiss();
    }, (err) => {
      this.loading.dismiss();
      console.log("not allowed");
      this.viewCtrl.dismiss();


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
