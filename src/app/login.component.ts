import { Component, OnInit } from '@angular/core';
import {loginuser} from '../../loginuser';
import {Services} from '../../services';
import {signupuser} from '../../signupuser';
import * as jwt_decode from 'jwt-decode';
import {stringify} from 'querystring';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: loginuser;
  user2: signupuser;
  pass: string;
  bool1: string;
  constructor(private services: Services) { }

  ngOnInit(): void {

  }

   log(Username: string, Password: string): void {
     this.pass = Password;
     this.pass =  this.services.hash(this.pass);
     Password = this.pass;
     this.bool1 = this.services.ver(Password);
     console.log(this.bool1);

     Password = this.bool1;

     this.services.loginn({Username, Password } as loginuser).subscribe(res => {

      const token = stringify(res);
      if (!token) {
        console.log('user not found');
        return;
      }

      const decoded = jwt_decode(token);
      const currentUser = JSON.stringify({
        role: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
      });
      localStorage.setItem('currentUser', currentUser);
      console.log(currentUser);
    });

  }
   sign(Username: string, Password: string, Email: string, Phone: number, Departmentid: number, RoleName: string): void {
    this.pass = Password;
    this.pass =  this.services.hash(this.pass);
    this.user2 = new signupuser(Username, this.pass, Email, Phone, Departmentid, RoleName);

    this.services.signup(this.user2).subscribe(res => {
      const token = stringify(res);
      const decoded = jwt_decode(token);
      const currentUser = JSON.stringify({
        role: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
      });
      localStorage.setItem('currentUser', currentUser);
      console.log(currentUser);
    });
  }

  Number(value: string) {
    const s: number = +value;
    return s;
  }
}
