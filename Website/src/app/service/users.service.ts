import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, Users } from '../models/user.models';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseurl = 'https://localhost:7296/api/User';

  constructor(private http:HttpClient) { }

  //get all users
  GetAllUsers(): Observable<Users[]>{
    return this.http.get<Users[]>(this.baseurl);
  }

}
