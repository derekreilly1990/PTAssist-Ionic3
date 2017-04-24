import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController, ModalController, LoadingController, AlertController } from 'ionic-angular';
import {ClientService} from "../../providers/clientservice/clientservice";
import {Exercises} from "../../providers/exercises/exercises";
import {Auth} from "../../providers/auth/auth";
import { Chart } from 'chart.js';
import * as moment from 'moment';

@Component({
  selector: 'page-client-stats',
  templateUrl: 'client-stats.html'
})

export class ClientStatsPage {


  client_weights = [];
  lineChart: any;
  weight_array=[];
  date_array=[];
  @ViewChild('lineCanvas') lineCanvas;


  constructor(public navCtrl: NavController, public clientService: ClientService, public toastCtrl: ToastController, public exerciseService: Exercises, public modalCtrl: ModalController,
              public alertCtrl: AlertController, public authService: Auth, public loadingCtrl: LoadingController, public navParams: NavParams) {

    for ( let single of this.clientService.currentclient.stats.bodyweight){
      this.weight_array.push(single.measurement);
      this.date_array.push(moment(single.time).format('LL'));
    }
  }

  ionViewDidLoad() {
    console.log(this.clientService.currentclient);

    let weights = this.clientService.currentclient.stats.bodyweight.map(function(weight) {
      return weight.measurement;
    });
    console.log("bodyweight measurements : " + weights);
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {

      type: 'line',
      data: {
        labels: this.date_array,
        datasets: [
          {
            label: "Bodyweight",
            fill: false,
            lineTension: 0.5,
            backgroundColor: "#FA0000",
            borderColor: "#FA0202",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#FA0202",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#FA0202",
            pointHoverBorderColor: "#FA0202",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.weight_array,
            spanGaps: false,
            hidden: false,

          }
        ]
      },
      options: {
        padding: '20',
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              displayFormats: {
                quarter: 'll'
              }
            }
          }]
        }
      }

    });
  }
  setWeightData(){
    for ( let single of this.clientService.currentclient.stats.bodyweight){
      this.weight_array.push(single.measurement);
      this.date_array.push(moment(single.time).format('LL'));
    }
  }

  showWeightPrompt() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Weight Entry');


    alert.addInput({
      name: 'weight',
      type: 'number',
      label: 'Weight'
    });
    alert.addInput({
      name: 'date',
      type: 'date',
      label: 'date'
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Enter',
      handler: data => {
        this.clientService.addClientWeight(data);
        console.log(data);


        for ( let single of this.clientService.currentclient.stats.bodyweight){
          this.weight_array.push(single.measurement);
          this.date_array.push(moment(single.time).format('LL'));
        }
        this.lineChart.update();


        for ( let single of this.clientService.currentclient.stats.bodyweight){
          this.weight_array.push(single.measurement);
          this.date_array.push(moment(single.time).format('LL'));
        }
        this.lineChart.update();




      }
    });
    alert.present();
  }
}
