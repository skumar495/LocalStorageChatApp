import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    var isLoggedIn = localStorage.getItem('isLoggedIn') || '0';
    if (isLoggedIn == '1')
      this.router.navigate(["chat"]);
  }

  onLogin(): void {
    if (this.username == 'admin' && this.password == 'admin') {
      localStorage.setItem('isLoggedIn', '1');
      this.router.navigate(["chat"]);
    } else {
      this.errorMessage = "Invalid credentials";
    }
  }
}
