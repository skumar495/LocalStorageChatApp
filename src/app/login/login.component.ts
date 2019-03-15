import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from '../common/constants'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  username: string;
  password: string;
  errorMessage: string = '';

  constructor(private router: Router) { }

  ngOnInit() {

    // Check if user is logged in. Return 0 if undefined
    let isLoggedIn = localStorage.getItem('isLoggedIn') || '0'; 
    if (isLoggedIn == '1')
      this.router.navigate(["chat"]); // User already logged in
    else{
        localStorage.clear(); // Clear storage anyway
      }
  }

  onLogin(): void {
    if (this.username == Constants.USERNAME && this.password == Constants.PASSWORD) {

      // We can save string values in local Storage
      localStorage.setItem('isLoggedIn', '1');
      this.router.navigate(["chat"]);
    } else {
      this.errorMessage = "Invalid credentials";
    }
  }
}
