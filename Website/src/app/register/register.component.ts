import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.models';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User();

  constructor(private _httpClient: HttpClient, private _router: Router) {

  }

  ngOnInit(): void {
  }

  Register() {
    this._httpClient.post('https://localhost:7296/api/User', this.user).subscribe(result => {

      if (result != null || result == "Not Found") {
        Swal.fire('Registration Successful', 'Please login using your credentials.', 'success');
        this._router.navigate(['/login']);
      }
      else{
        Swal.fire('Hi', 'Something went wrong. Please Try Again.', 'info');
      }
    }, (error) => {
      console.log(error);
      Swal.fire('Error', 'An Error Has Occured. Please Try Again.', 'error');
    })
  }
}
