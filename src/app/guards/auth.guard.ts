import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiMemoService } from '../service/api-memo.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private apiMemoService: ApiMemoService,
    private router: Router
  ) {

  }

  //Si no existe el token redirecciona a login
  canActivate(): boolean {
    if (!this.apiMemoService.isAuth()) {
      this.router.navigate(['login'])
      return false
    }
    return true
  }

}
