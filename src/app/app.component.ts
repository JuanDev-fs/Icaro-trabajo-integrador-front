import { Component } from '@angular/core';
import { GetUsersService } from './service/get-users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MyAppMemo';
  stateSidenav: boolean = true

  constructor(public getUsersService: GetUsersService) { }

  reciboDatos($event: string) {
    this.stateSidenav = !this.stateSidenav
  }

  isLargeScreen() {
    const width = window.innerWidth /* || document.documentElement.clientWidth || document.body.clientWidth */;
    console.log(window.innerWidth)
      
    if (width > 720) {
        return true;
    } else {
        return false;
    }
  }
}
