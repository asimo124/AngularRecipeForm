import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';

@Injectable()
export class AuthGuard implements CanActivate {

  isE2l:boolean = false;

  constructor(
    private oauthService: OAuthService,
    private router: Router
  ) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.isLoggedIn()) {
      console.log('is logged in - Yes!!!');
      return true;
    } else {
      const tree: UrlTree = this.router.parseUrl('/');
      sessionStorage.setItem('afterLoginUrl', window.location.pathname);
      return tree;
      //return false;
    }
  }

  /*canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    console.log('trying canActivate');
    return this.oauthService
      .tryLogin()
      .then((res) => {
        console.log('got result',res);
          return this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken()
      });
  }*/

  isLoggedIn(): boolean {
    var hasAccessToken = this.oauthService.hasValidAccessToken();
    console.log('hasAccessToken: ', hasAccessToken);
  	return hasAccessToken;
  }

}
