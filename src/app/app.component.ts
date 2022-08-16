import { Component } from '@angular/core';
import { GetUsersService } from './service/get-users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MyAppMemo';
 
  

  constructor(public getUsersService:GetUsersService){

  }

}
