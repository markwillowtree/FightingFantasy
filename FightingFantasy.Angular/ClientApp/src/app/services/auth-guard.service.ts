import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate  {

  constructor(public oidcSecurityService: OidcSecurityService, public router: Router) { }

  canActivate(): boolean {
    var canRoute: boolean;

    this.oidcSecurityService.isAuthenticated$.subscribe(authenticated => {
      if (!authenticated) {
        this.router.navigate(['login']);
        canRoute = false;
      }

      canRoute = true;
    });


    return canRoute;
  }
}
