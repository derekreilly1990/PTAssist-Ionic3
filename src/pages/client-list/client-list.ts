import { Component } from '@angular/core';
import {NavController, NavParams, ToastController, ModalController, LoadingController} from 'ionic-angular';
import { AddClientPage } from '../add-client/add-client'
import { ClientViewHomePage } from '../client-view-home/client-view-home'
import {ClientService} from "../../providers/clientservice/clientservice";

@Component({
  selector: 'page-client-list',
  templateUrl: 'client-list.html',
})
export class ClientListPage {

  loading : any;


  constructor(public nav: NavController,public toastCtrl: ToastController,public loadingCtrl: LoadingController,public modalCtrl: ModalController, public clientService: ClientService, public navParams: NavParams) {


  }
  ionViewDidLoad(){

this.clientService.getClients();

  }

  goToClientViewHome(client){
    this.clientService.getClientDetails(client);
    this.nav.push(ClientViewHomePage);

  }
  showAddClientModal() {
    let modal = this.modalCtrl.create(AddClientPage);
    modal.onDidDismiss(() => {
      this.clientService.getClients();

      });
       modal.present();
    }



  deleteClient(client){

    this.showLoader();

    this.clientService.deleteClient(client._id)

      this.loading.dismiss();

      let index = this.clientService.clientlist.indexOf(client);

      if(index > -1){
        this.clientService.clientlist.splice(index, 1);
      }


  }
  showLoader(){

    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();

  }

}
