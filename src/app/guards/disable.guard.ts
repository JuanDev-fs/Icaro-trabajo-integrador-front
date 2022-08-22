import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiMemoService } from '../service/api-memo.service';

@Injectable({
  providedIn: 'root'
})
export class DisableGuard implements CanActivate {
  constructor(
    private apiMemoService: ApiMemoService,
    private router: Router
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.apiMemoService.isAuth()) { //si no estoy logeado
      return true //habilito la ruta de login y register
    }
    this.router.navigate(['inbox'])
    return false //si estoy logeado, las deshabilito
  }

}
