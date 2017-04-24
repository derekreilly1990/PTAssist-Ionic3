import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { ClientDetailPage } from '../../pages/client-detail/client-detail'
import { ProgramViewEditPage } from '../../pages/program-view-edit/program-view-edit';
import { ClientStatsPage } from "../client-stats/client-stats";
import {ClientService} from "../../providers/clientservice/clientservice";
import {Auth} from "../../providers/auth/auth";
import {ClientProgramViewPage} from "../client-program-view/client-program-view";
import {LoginPage} from "../login/login";
import {ClientDietPage} from "../client-diet/client-diet";

@Component({
  selector: 'page-client-view-home',
  templateUrl: 'client-view-home.html'
})
export class ClientViewHomePage {

  weight_array=[];
  date_array=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public clientService: ClientService, public authService: Auth) {

  }
  ionViewDidLoad (){

     for ( let single of this.clientService.currentclient.stats.bodyweight){
       this.weight_array.push(single.measurement);
       this.date_array.push(single.time.toString());
     }
  }
  goToClientDetailPage(){
      this.navCtrl.push(ClientDetailPage);
  }
  goToClientProgramPage(){
    if(this.authService.isclient){
      this.navCtrl.push(ClientProgramViewPage);
    }else {
      this.navCtrl.push(ProgramViewEditPage);
    }

  }
  goToClientStatsPage(){
    this.navCtrl.push(ClientStatsPage, {
      weight_array: this.weight_array,
      date_array: this.date_array
    });


  }
  goToClientDietPage() {
    this.navCtrl.push(ClientDietPage);
  }
  logOut(){
    this.authService.logout();
    this.navCtrl.setRoot(LoginPage);
  }


  }



