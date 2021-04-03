import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {RecipeFormService} from './services/recipe-form.service';
import {Subscription} from 'rxjs';
import {Recipe} from './models/recipe-form';
import {NzMessageService} from 'ng-zorro-antd';
import {NavigationEnd, Router} from '@angular/router';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { authConfig } from './auth.config';
import {OAuthService} from 'angular-oauth2-oidc';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  page = 'recipe-form';
  isCollapsed = true;
  isReverseArrow = false;
  width = 200;
  collapsedWidth = 0;

  constructor(
    private oauthService: OAuthService,
    private router: Router) {

    router.events.subscribe((val) => {

      const self = this;
      Object.keys(val).forEach(function getKey(key) {
        if (key === 'routerEvent') {
          Object.keys(val[key]).forEach(function getNextKey(nextKey) {
            if (nextKey === 'url') {
              if (val[key][nextKey] === '/ingredient-form') {
                self.page = 'ingredient-form';
              } else {
                self.page = 'recipe-form';
              }
            }
          });
        }
      });
    });

    this.configureWithNewConfigApi();
  }

  private configureWithNewConfigApi() {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.tryLogin().then(result => {

      console.log('login worked!');

    }).catch(e => {
      // invalid login, refresh so they can try again

      console.log('login did not work');

      /**
       * TODO - uncomment this
       */
      window.location.assign(environment.appLocation);


    });

    this.oauthService.events.subscribe(e => {
      console.log('oauth/oidc event', e);
    });
  }

  clickNav(action) {
    this.router.navigateByUrl(action);
    this.isCollapsed = true;
  }

  ngOnInit(): void {

    localStorage.removeItem('newRecipeItemId');
  }
}
