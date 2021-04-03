import { Component, OnInit } from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {Router} from '@angular/router';
import {AuthGuard} from '../../authguard';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.scss']
})
export class GuestComponent implements OnInit {

  userAuth = false;

  constructor(
    private oauthService: OAuthService,
    private router: Router,
    private authGuard: AuthGuard
  ) {
    this.userAuth = this.authGuard.isLoggedIn();
    if(!this.userAuth){
      this.oauthService.initImplicitFlow();
    }
  }

  ngOnInit() {
    var self = this;

    // this timeout allows the user to be redirected when logged in
    // without it, authguard may not be loaded before this ngOnInit gets called?
    setTimeout(function() {
      if(self.authGuard.isLoggedIn()) {

        let redirectUrl = sessionStorage.getItem('afterLoginUrl');
        if(redirectUrl && redirectUrl != 'null') {
          sessionStorage.removeItem('afterLoginUrl');
          self.router.navigate([redirectUrl]);
        } else {
          self.router.navigate(['/add-recipe']);
        }
      }
    },200);
  }

  login(): void {
    this.oauthService.initImplicitFlow();
  }

}
