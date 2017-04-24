import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Auth } from '../auth/auth';
import 'rxjs/add/operator/map';

@Injectable()
export class ClientService {
  public token: any;
  public trainerId: any;
  public currentclient: any;
  public clientlist: any = [];
  constructor(public http: Http, public storage: Storage, public authService: Auth) {




  }
  createClientAccount(details){
    return new Promise((resolve, reject) => {


    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.post('https://ptassist.herokuapp.com/api/auth/register', JSON.stringify(details), {headers: headers})
      .map(res => res.json())
      .subscribe(res => {
        console.log("created :" + res);
        resolve(res);
      }, (err) => {
        reject(err);
        console.log("create err" + err);
      });

    });

  }

  deleteClient(id){

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Authorization', this.authService.token);

      this.http.delete('https://ptassist.herokuapp.com/api/auth/delete/' + id, {headers: headers}).subscribe((res) => {
        resolve(res);

      }, (err) => {


        reject(err);
      });

    });

  }
  returnClientPrograms(client_id){

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Authorization', this.authService.token);

      this.http.get('https://ptassist.herokuapp.com/api/programs/client_programs/' + client_id, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });

    });

  }
  getClients(){

    let headers = new Headers();
    headers.append('Authorization', this.authService.token);

    this.http.get('https://ptassist.herokuapp.com/api/auth/' + this.authService.user._id, {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        this.clientlist = data;
        console.log(this.clientlist);
      }, (err) => {

        console.log(err);
      });



  }


   async getClientDetails(id){



    let headers = new Headers();
    headers.append('Authorization', this.authService.token);

   await this.http.get('https://ptassist.herokuapp.com/api/auth/clientdetail/' + id, {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        this.currentclient = data;
      }, (err) => {
        console.log(err);
      });



  }

  addClientWeight(weight){



    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.token);
    let client_id = this.currentclient._id;

    this.http.post('https://ptassist.herokuapp.com/api/auth/stats/weight/' + client_id, JSON.stringify(weight), {headers: headers})
      .subscribe(res => {
        this.getClientDetails(client_id);

      }, (err) => {

        console.log("error",err);
      });



  }
  addClientDiet(diet,client){

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authService.token);
      let client_id = client._id;

      this.http.post('https://ptassist.herokuapp.com/api/auth/diet/' + client_id, JSON.stringify(diet), {headers: headers})
        .subscribe(res => {

          resolve(res);
        }, (err) => {
          reject(err);
        });

    });

  }
  getClientWeights(id){

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Authorization', this.authService.token);

      this.http.get('https://ptassist.herokuapp.com/api/programs/client_stats/bodyweight/' + id, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });

    });

  }
  getClientDiet(id){

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Authorization', this.authService.token);

      this.http.get('https://ptassist.herokuapp.com/api/programs/diet/' + id, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });

    });

  }
}
