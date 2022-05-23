import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  UserSession: User = new User();
  constructor(private _httpClient: HttpClient, private _router: Router) { }

  ngOnInit(): void {
  }

  Login() {
    this._httpClient.get<User[]>(`https://localhost:7296/api/User/UserLogin/` + this.user.Email + '/' + this.user.Password).subscribe(result => {

      if (result != null || result == "Not Found") {
        localStorage.setItem('UserSession', 'true');
        this._router.navigate(['/home']);
      }
      else {
        Swal.fire('Hi', 'Your Credentials Did Not Match Our Record. Please Try Again.', 'info');
      }
    }, (error) => {

      Swal.fire('Error', 'An Error Has Occured. Please Try Again.', 'error');
      console.log(error);

    });
  }

}
