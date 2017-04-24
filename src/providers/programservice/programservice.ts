import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Auth } from '../auth/auth';
import 'rxjs/add/operator/map';

@Injectable()
export class ProgramService {
  programs: any;
  trainerprograms: any;

  constructor(public http: Http, public storage: Storage, public authService: Auth) {
    this.getPrograms();
  }

  getPrograms(){



    let headers = new Headers();
    headers.append('Authorization', this.authService.token);

    this.http.get('https://ptassist.herokuapp.com/api/programs', {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        this.programs = data;
      }, (err) => {
        console.log("program : ",err)
      });


  }
  getTrainersPrograms(){



    let headers = new Headers();
    headers.append('Authorization', this.authService.token);

    this.http.get('https://ptassist.herokuapp.com/api/programs/trainer/' + this.authService.user._id, {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        this.trainerprograms = data;
        console.log("trainer programs : ",data);
      }, (err) => {
        console.log("trainer programs :" , err);
      });


  }



  createProgram(program){


    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.token);

    this.http.post('https://ptassist.herokuapp.com/api/programs', JSON.stringify(program), {headers: headers})
      .map(res => res.json())
      .subscribe(res => {
        console.log("create program res :" , res);
      }, (err) => {
        console.log("create program : ", err);
      });



  }
  addClientProgram(program,client_id){



    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.token);

    this.http.post('https://ptassist.herokuapp.com/api/programs/client/' + client_id,JSON.stringify(program), {headers: headers})
      .map(res => res.json())
      .subscribe(res => {
        console.log("add client program res :",res)
      }, (err) => {
        console.log("add client program err :",err);
      });



  }

  deleteProgram(id){

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Authorization', this.authService.token);

      this.http.delete('https://ptassist.herokuapp.com/api/programs/' + id, {headers: headers}).subscribe((res) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });

    });

  }
  deleteClientProgram(client_id, program_id){

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Authorization', this.authService.token);

      this.http.delete('https://ptassist.herokuapp.com/api/programs/client/delete' + client_id + "/" + program_id,  {headers: headers}).subscribe((res) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });

    });

  }


}

