import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AutentificacionService } from '../services/autentificacion.service';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {

  constructor(private authService : AutentificacionService, private router : Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Promise ((resolve , reject) => {
        this.authService.getCurrentUser().subscribe( data => {
          if ( data) {
             if (data.rol == 'admin') {
               resolve(true)
             } else {
               this.router.navigate(['/home']);
               resolve(false);
             }
          } else {
            this.router.navigate(['/home']);
            resolve(false);
          }
        })   
     })
  }
  
}
