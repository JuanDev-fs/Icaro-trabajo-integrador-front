import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { GetUsersService } from 'src/app/service/get-users.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Output() actionButton: EventEmitter<string> = new EventEmitter<string>(); //output hijo -->padre


  // logged:boolean=true
  logged: boolean = true
  username: string = " "

  constructor(
    public getUsersService: GetUsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  logout() {
    localStorage.removeItem('username')
    localStorage.removeItem('token')
    this.getUsersService.userNameToolbar = ''
    this.getUsersService.opened = false
    this.router.navigate(['login'])
  }

  //evento para output
  onClickButton() {
    this.actionButton.emit()
  }
}
