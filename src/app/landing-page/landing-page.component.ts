import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.deptid();
    this.email();
    this.phone();
    this.role();
    this.username();
  }
  username(): string{
    return localStorage.getItem('username');
  }
  role(){
    return localStorage.getItem('role');
  }
  deptid(){
    return localStorage.getItem('deptid');
  }
  phone(){
    return localStorage.getItem('phone');
  }
  email(){
    return localStorage.getItem('email');
  }
}
