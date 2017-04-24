import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

@Injectable()
export class Auth {

  public token: any;
  public user: any;
  public user_role: any;
  public isclient: boolean = false;

  constructor(public http: Http, public storage: Storage) {

  }

  checkAuthentication(){

    return new Promise((resolve, reject) => {

      //Load token if exists
      this.storage.get('token').then((value) => {

        this.token = value;

        let headers = new Headers();
        headers.append('Authorization', this.token);

        this.http.get('https://ptassist.herokuapp.com/api/auth/protected', {headers: headers})
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });

      });

    });

  }

  createAccount(details){

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.post('https://ptassist.herokuapp.com/api/auth/register', JSON.stringify(details), {headers: headers})
        .subscribe(res => {

          let data = res.json();
          this.token = data.token;
          this.user = data.user;
          this.user_role = this.user.role;
          if(this.user_role === 'client'){
            this.isclient = true;
          }
          this.storage.set('token', data.token);
          this.storage.set('user', data.user);
          resolve(data);

        }, (err) => {
          reject(err);
        });

    });

  }


  login(credentials){

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.post('https://ptassist.herokuapp.com/api/auth/login', JSON.stringify(credentials), {headers: headers})
        .map(res => res.json())
        .subscribe(res => {

          console.log(res.user.role);
          this.token = res.token;
          this.user = res.user;
          this.user_role = this.user.role;
          this.storage.set('token', res.token);
          this.storage.set('user', res.user);
          resolve(res);
         
        }, (err) => {
          reject(err);
        });

    });

  }

  logout(){
    this.storage.set('token', '');
    this.storage.set('user', '');
  }

}
