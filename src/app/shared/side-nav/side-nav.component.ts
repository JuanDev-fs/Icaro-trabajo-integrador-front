import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetUsersService } from 'src/app/service/get-users.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  constructor(private router:Router, private getUsersService:GetUsersService) { }

  ngOnInit(): void {
  }

  /* logout(){
    localStorage.removeItem('username')
    localStorage.removeItem('token')
    this.getUsersService.userNameToolbar = ''
    this.getUsersService.opened=false
    this.router.navigate(['login'])
  } */
}
