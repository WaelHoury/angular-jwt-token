import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { loginuser } from './loginuser';
import { signupuser } from './signupuser';
import {concat, Observable, of} from 'rxjs';
import * as bcrypt from 'bcryptjs';
import {stringify} from 'querystring';
import { Res } from './result';
import {map} from 'rxjs/operators';
import {json} from '@angular-devkit/core';
import {User} from './user';
import {Token} from './token';

@Injectable({ providedIn: 'root' })
export class Services {
  public API = 'https://localhost:44363/api';
  result: Observable<Res>;
  result1: Res[];
  result12: Res[];
  result2: Res;
  bool: boolean;
  data: string;
  passv: string;
  pass: any = [];

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
  ver(user: User, pass1: string) {
    return this.http.post<Res>('https://localhost:44331/api/passv', user);
  }

   hash(pass: string) {
    const saltRounds = 10;
    const salt =  bcrypt.genSaltSync(saltRounds);

    const hash =  bcrypt.hashSync(pass, saltRounds);
    return hash;

  }

}
