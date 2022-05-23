import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from '../models/user.models';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {

  id: any;
  User: any;

  constructor(private _httpClient: HttpClient,private _router: Router, private _active_route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this._active_route.snapshot.paramMap.get('id');
    this._httpClient.get('https://localhost:7296/api/User/' + this.id)
      .subscribe(result => {
        console.log(result);
        this.User = result;
      }, (error) => {
      });
  }

}
