import { Component } from '@angular/core';
import { NavController , ModalController, AlertController, LoadingController, ViewController, NavParams} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup, FormArray} from '@angular/forms';
import { Auth } from '../../providers/auth/auth';
import { Exercises } from '../../providers/exercises/exercises';
import { ProgramService } from '../../providers/programservice/programservice';
import {ClientService} from "../../providers/clientservice/clientservice";


@Component({
  selector: 'page-add-program-modal',
  templateUrl: 'add-program-modal.html'
})

export class AddProgramModalPage {

  loading: any;
  program : FormGroup;



  constructor(public navParams: NavParams,public navCtrl: NavController,public viewCtrl: ViewController,public exerciseService: Exercises, private formBuilder: FormBuilder,public modalCtrl: ModalController,
              public alertCtrl: AlertController, public authService: Auth, public programService: ProgramService,public clientService: ClientService, public loadingCtrl: LoadingController) {
    this.program = this.formBuilder.group({
      title: ['', Validators.required],
      createdby: [''],
      description: ['',Validators.required],
      exercises: this.formBuilder.array([
        this.initExercise()
      ])

    });

  }
  initExercise() {

    return this.formBuilder.group({
      exercise: ['', Validators.required],
      sets: ['', Validators.required]
    });
  }
  addExercise() {
    // add exercise to the list
    const control = <FormArray>this.program.controls['exercises'];
    control.push(this.initExercise());
  }
  removeExercise(i: number) {
    // remove exercise from the list
    const control = <FormArray>this.program.controls['exercises'];
    control.removeAt(i);
  }
  addProgram(){
    this.showLoader();
    this.program.patchValue({createdby: this.authService.user._id});

    this.programService.createProgram(this.program.value);
      this.loading.dismiss();
      this.viewCtrl.dismiss();

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
