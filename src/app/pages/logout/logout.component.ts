import { Component, OnInit } from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private oauthService: OAuthService, private router: Router) { }

  ngOnInit() {
    this.oauthService.logOut();
    this.router.navigate(['/']);
  }
}
