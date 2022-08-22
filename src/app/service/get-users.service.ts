import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiMemoService } from './api-memo.service';

@Injectable({
  providedIn: 'root'
})
export class GetUsersService {
  userNameToolbar: string = ''
  opened: boolean = false;

  constructor(private http: HttpClient, private apiMemoService: ApiMemoService) { }

  //permite mostrar/ocultar ciertas partes del toolbar si esta loggeado
  toolbar() {
    if (this.apiMemoService.isAuth()) {
      this.opened = true
      return true
    } else {
      this.opened = false
      return false
    }
  }

  //traigo el username para mostrar en el toolbar
  getUser() {
    this.userNameToolbar = localStorage.getItem('username') || "[]"
    return this.userNameToolbar
  }

}
