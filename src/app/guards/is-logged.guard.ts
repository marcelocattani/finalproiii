import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { take , map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedGuard implements CanActivate {
  
  constructor ( private authService : AngularFireAuth,
              private router : Router){}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
    return this.authService.authState
    .pipe ( take (1))
    .pipe( map ( authSatate =>  !!authSatate))
    .pipe ( tap ( auth => {
      if ( !auth){
        this.router.navigate(['/user/login']);
        return false 
      } else {
        return true; 
      }
    })) 
  }
  
}
