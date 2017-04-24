import { Component } from '@angular/core';
import { NavController , NavParams} from 'ionic-angular';


/*
  Generated class for the ClientDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-client-detail',
  templateUrl: 'client-detail.html'
})
export class ClientDetailPage {
  client: any;
  clientdetails: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.client = navParams.get('client');
    this.clientdetails = this.client;


  }



}
