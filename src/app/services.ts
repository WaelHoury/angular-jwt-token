import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { loginuser } from './loginuser';
import { signupuser } from './signupuser';
import {concat, Observable, of} from 'rxjs';
import * as bcrypt from 'bcryptjs';



@Injectable({ providedIn: 'root' })
export class Services {
  public API = 'https://localhost:44363/api';
  bool: string;
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient) {
  }

  loginn(user: loginuser): Observable<loginuser> {
    return this.http.post<loginuser>('https://localhost:44331/api/login', user, this.httpOptions);
  }

  signup(user2: signupuser): Observable<signupuser> {
    return this.http.post<signupuser>('https://localhost:44331/api/signup', user2, this.httpOptions);
  }
  ver(pass1: string){
    const saltRounds = 10;
    const salt =  bcrypt.genSaltSync(saltRounds);
    const pepper = '$5372';
    const hash =  bcrypt.hashSync(pass1, saltRounds);
    this.bool = bcrypt.compareSync(pass1, hash);
    return this.bool.toString();
  }
   hash(pass: string) {
    const saltRounds = 10;
    const salt =  bcrypt.genSaltSync(saltRounds);
    const pepper = '$5372';
    const pass1 = pass + pepper;
    const hash =  bcrypt.hashSync(pass1, saltRounds);
    bcrypt.compareSync(pass, hash);
    return hash;

  }

}
