import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {RecipeFormService} from './services/recipe-form.service';
import {Subscription} from 'rxjs';
import {Recipe} from './models/recipe-form';
import {NzMessageService} from 'ng-zorro-antd';
import {NavigationEnd, Router} from '@angular/router';

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

  constructor(private router: Router) {

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
  }

  clickNav(action) {
    this.router.navigateByUrl(action);
    this.isCollapsed = true;
  }

  ngOnInit(): void {

    localStorage.removeItem('newRecipeItemId');
  }
}
