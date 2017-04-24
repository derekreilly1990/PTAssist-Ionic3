import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Auth } from '../auth/auth';
import 'rxjs/add/operator/map';

@Injectable()
export class Exercises {
  exercises: any;

  constructor(public http: Http, public authService: Auth) {
    this.getExercises();

  }
  getExercises(){



    let headers = new Headers();
    headers.append('Authorization', this.authService.token);

    this.http.get('https://ptassist.herokuapp.com/api/exercises', {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
        this.exercises = data;

      }, (err) => {
        console.log(err);
      });


  }
  returnExercise(exerciseId){
    for(let exercise of this.exercises){

      if(exerciseId == exercise._id){

        return exercise;

      }
    }
  }

  createExercise(exercise){

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authService.token);

      this.http.post('https://ptassist.herokuapp.com/api/exercises', JSON.stringify(exercise), {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });

    });

  }

  deleteExercise(id){

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Authorization', this.authService.token);

      this.http.delete('https://ptassist.herokuapp.com/api/exercises/' + id, {headers: headers}).subscribe((res) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });

    });

  }


}
