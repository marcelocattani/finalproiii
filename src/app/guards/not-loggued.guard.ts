import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";
import { take, map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class NotLogguedGuard implements CanActivate {
  constructor(private authService: AngularFireAuth, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):| Observable<boolean | UrlTree>  | Promise<boolean | UrlTree> | boolean| UrlTree {
    return new Promise ( (resolve, reject) => {
      this.authService.authState.subscribe( data => {
        if ( data ) {
          this.router.navigate( ['/home'])
          resolve( false)
        } else {
          resolve ( true)
        }
      })
    })
  }
}
