import { Component } from '@angular/core';
import { NavController,ModalController, ViewController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser'

/*
  Generated class for the VideoModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-video-modal',
  templateUrl: 'video-modal.html'
})
export class VideoModalPage {

  video: any;

  constructor(public navCtrl: NavController,public modalCtrl: ModalController, public viewCtrl: ViewController,params: NavParams, public sanitiser: DomSanitizer) {
    this.video = params.get('video');
    console.log("In video Module"+ this.video)
  }


  dismiss() {
    this.viewCtrl.dismiss()
  }

}
