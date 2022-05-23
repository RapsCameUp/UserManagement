import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User, Users } from '../models/user.models';
import { AuthGuardService } from '../service/auth-guard.service';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: Users[] = [];
  user_counter = 0;

  constructor(private usersService: UsersService, private _httpClient: HttpClient,private _authGuard: AuthGuardService,private _router: Router) {

  }

  ngOnInit(): void {
    this.GetAllUsers();
  }

  GetAllUsers() {
    this.usersService.GetAllUsers().subscribe(
      response => {
        this.users = response;
        console.log(this.users);
        this.users.forEach(value => {
          this.user_counter++;
        });
      }
    );
  }

  RemoveUser(id: any) {

    console.log(id);
    this._httpClient.delete('https://localhost:7296/api/User/' + id).subscribe(result => {

      if (result != null || result != "Not Found") {

        console.log(result);
        Swal.fire('Successful', 'User has been successfully disabled.', 'success');

       window.location.reload();
      } else {
        console.log(result);
        Swal.fire('Warning', 'An Error Has Occured. Please Try Again.', 'warning');
      }

    }, (error) => {
      Swal.fire('Error', 'An Error Has Occured. Please Try Again.', 'error');
      console.log(error);
    });
  }

  logout() {
    this._authGuard.logout();
    this._router.navigate(['/login']);
  }
}
