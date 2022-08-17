import {  Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ApiMemoService } from 'src/app/service/api-memo.service';
import { GetUsersService } from 'src/app/service/get-users.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Output() actionButton: EventEmitter<string> = new EventEmitter<string>(); //output hijo -->padre




 // logged:boolean=true
  logged:boolean=true
  username:string=" "
  
  constructor(
    //private apiMemoService:ApiMemoService,
    public getUsersService:GetUsersService,
    private router:Router
     ) { }

  ngOnInit(): void {
    /* this.logged =  */ /* this.isLogged() */
    //this.username = localStorage.getItem('username') || '[]'
  }

  // isLogged(){
  //   if(localStorage.getItem('username')){
  //     return true
  //   } else {
  //     return false
  //   }
  // }

  // isLogged(){
  //   this.logged = this.apiMemoService.isAuth()
  //   if(this.logged){
  //     this.username = localStorage.getItem('username') || '[]'
  //     this.getUsersService.userNameToolbar=this.username
  //   } else {
  //     this.username = ""
  //   }
  // }

  logout(){
    localStorage.removeItem('username')
    localStorage.removeItem('token')
    this.getUsersService.userNameToolbar = ''
    this.getUsersService.opened=false
    this.router.navigate(['login'])
  }


  //evento para output
  onClickButton(){
    //const mensaje = "Hicieron click en el boton que pertence al hijo"
    this.actionButton.emit(/* mensaje */)
  }
}
