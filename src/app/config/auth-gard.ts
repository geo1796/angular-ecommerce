import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { OktaAuthStateService } from "@okta/okta-angular";
import { map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class AuthGuard implements CanActivate {
    constructor(
        private authService: OktaAuthStateService,
      private router: Router
    ) {}
  
    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> {
  
      return this.authService.authState$.pipe(
        map(authState => {
          if (!authState.isAuthenticated) {
            return this.router.parseUrl('/login');
          }
  
          return true;
        })
      );
    }
  }