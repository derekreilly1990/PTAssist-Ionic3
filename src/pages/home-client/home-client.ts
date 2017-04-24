import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the HomeClient page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home-client',
  templateUrl: 'home-client.html'
})
export class HomeClientPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello HomeClientPage Page');
  }

}
