import { Component } from '@angular/core';
import { User } from './models/user.models';
import { UsersService } from './service/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'UserManagement';

  constructor(){
  }

  ngOnInit(): void{
  }
}
