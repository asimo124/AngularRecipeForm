import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';
import {siteSettings} from '../models/site-settings';
import {TopRecipeFilters} from '../models/top-recipes';

@Injectable({
  providedIn: 'root'
})
export class TopRecipesService {

  private topRecipeItems: any[] = [];
  private topRecipeSource = new BehaviorSubject(this.topRecipeItems);
  public topRecipeList = this.topRecipeSource.asObservable();

  private ingredientsByPriceItems: any = [];
  private ingredientsByPriceSource = new BehaviorSubject(this.ingredientsByPriceItems);
  public ingredientsByPriceList = this.ingredientsByPriceSource.asObservable();

  private shoppingListItems: any = [];
  private shoppingListSource = new BehaviorSubject(this.shoppingListItems);
  public shoppingListList = this.shoppingListSource.asObservable();

  private apiUrl = siteSettings.apiUrl;

  constructor(
    private http: HttpClient,
    private messageService: NzMessageService
  ) { }

  buildParams(filters: TopRecipeFilters) {

    console.log('filters: ', filters);

    let params = '';
    if (filters.proteinId) {
      params = 'protein_id=' + filters.proteinId + '&';
    }

    if (filters.difficultyLevelId) {
      params += 'difficulty_level_id=' + filters.difficultyLevelId + '&';
    }
    if (filters.recipeStyleId) {
      params += 'recipe_style_id=' + filters.recipeStyleId + '&';
    }
    if (filters.tasteLevelId) {
      params += 'taste_level_id=' + filters.tasteLevelId + '&';
    }
    if (filters.sort1) {
      params += 'sort1=' + filters.sort1 + '&';
    }
    if (filters.sort_dir1) {
      params += 'sort_dir1=' + filters.sort_dir1 + '&';
    }
    if (filters.sort2) {
      params += 'sort2=' + filters.sort2 + '&';
    }
    if (filters.sort_dir2) {
      params += 'sort_dir2=' + filters.sort_dir2 + '&';
    }
    if (filters.sort3) {
      params += 'sort3=' + filters.sort3 + '&';
    }
    if (filters.sort_dir3) {
      params += 'sort_dir3=' + filters.sort_dir3 + '&';
    }


    return params;
  }

  getTopRecipes(filters: TopRecipeFilters) {

    const params = this.buildParams(filters);

    this.http.get<any>(this.apiUrl + '/top-recipes/top-recipes?' + params).subscribe(response => {
      if (response && response.items) {
        this.topRecipeSource.next(response.items);
      }
    },
    (err) => {
      console.log('error', 'Error loading Top Recipes : ' + err.error.message);
    });
  }

  getIngredientsByPrice() {

    this.http.get<any>(this.apiUrl + '/top-recipes/ingredients-by-price').subscribe(response => {

      console.log('response: ', response);
      if (response && response.items) {
        console.log('resposne.items: ', response.items);
        this.ingredientsByPriceSource.next(response.items);
      }
    },
    (err) => {
      console.log('error', 'Error loading Top Recipes : ' + err.error.message);
    });
  }

  getShoppingList() {

    let shoppingList = '';
    let hasShoppingList = false;
    if (sessionStorage.getItem('shopping_list')) {
      shoppingList = sessionStorage.getItem('shopping_list');
      if (shoppingList) {
        hasShoppingList = true;
      }
    }
    if (!hasShoppingList) {
      return;
    }
    const shoppingListItem = JSON.parse(shoppingList);
    if (!shoppingListItem.hasOwnProperty('recipes')) {
      return;
    }
    const body = new URLSearchParams();
    let i = 0;
    shoppingListItem.recipes.forEach(function getRecipe(recipeId) {
      body.set('recipes[' + i + ']', String(recipeId));
      i++;
    });

    console.log('body: ', body);

    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    this.http.post<any>(this.apiUrl + '/top-recipes/shopping-list', body.toString(), options).subscribe(response => {
        if (response) {
          this.shoppingListSource.next(response);
          // this.messageService.create('success', `Recipe created`);
        }
      },
      (err) => {
        console.log('error', 'Error loading Shopping List : ' + err.error.message);
        this.messageService.create('error', 'Error loading Shopping List : ' + err.error.message);
      });
  }
}
