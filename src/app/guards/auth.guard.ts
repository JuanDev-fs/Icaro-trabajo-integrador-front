import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiMemoService } from '../service/api-memo.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private apiMemoService:ApiMemoService,
    private router:Router
    ){

  }

  canActivate():boolean{
    if(!this.apiMemoService.isAuth()){
      this.router.navigate(['login'])
      return false
    } 
    return true
  }
  
  
}


/* canActivate(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  return true;
} */