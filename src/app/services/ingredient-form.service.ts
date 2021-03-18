import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';
import {siteSettings} from '../models/site-settings';
import {Ingredient} from '../models/recipe-form';

@Injectable({
  providedIn: 'root'
})
export class IngredientFormService {

  private recipeItems: any = [];
  private recipeSource = new BehaviorSubject(this.recipeItems);
  public recipeList = this.recipeSource.asObservable();

  private ingredientItems: any = [];
  private ingredientSource = new BehaviorSubject(this.ingredientItems);
  public ingredientList = this.ingredientSource.asObservable();

  private ingredientCreatedItem: Ingredient = null;
  private ingredientCreatedSource = new BehaviorSubject(this.ingredientCreatedItem);
  public ingredientCreatedListItem = this.ingredientCreatedSource.asObservable();

  private ingredientUpdatedItem: Ingredient = null;
  private ingredientUpdatedSource = new BehaviorSubject(this.ingredientUpdatedItem);
  public ingredientUpdatedListItem = this.ingredientUpdatedSource.asObservable();

  private ingredientRemovedItem: Ingredient = null;
  private ingredientRemovedSource = new BehaviorSubject(this.ingredientRemovedItem);
  public ingredientRemovedListItem = this.ingredientRemovedSource.asObservable();

  private recipeIngredientsUpdatedItem: Ingredient = null;
  private recipeIngredientsUpdatedSource = new BehaviorSubject(this.recipeIngredientsUpdatedItem);
  public recipeIngredientsUpdatedListItem = this.recipeIngredientsUpdatedSource.asObservable();

  private apiUrl = siteSettings.apiUrl;

  constructor(
    private http: HttpClient,
    private messageService: NzMessageService
  ) { }

  getRecipes() {

    this.http.get<any>(this.apiUrl + '/recipe-form/recipes').subscribe(response => {
        this.recipeSource.next(response);
      },
      (err) => {
        console.log('error', 'Error loading Get Recipes : ' + err.error.message);
      });
  }

  getIngredients() {

    this.http.get<any>(this.apiUrl + '/recipe-form/ingredients').subscribe(response => {
        this.ingredientSource.next(response);
      },
      (err) => {
        console.log('error', 'Error loading Get Ingredients : ' + err.error.message);
      });
  }

  updateIngredient(ingredient, id) {

    console.log('ingredient: ', ingredient);

    const body = new URLSearchParams();
    if (ingredient.title) {
      body.set('title', ingredient.title);
    }
    if (ingredient.price) {
      body.set('price', String(ingredient.price));
    }
    if (ingredient.cheap_price) {
      body.set('cheap_price', String(ingredient.cheap_price));
    }

    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    this.http.post<any>(this.apiUrl + '/recipe-form/update-ingredient?id=' + id, body.toString(), options).subscribe(response => {
        if (response && response.item) {
          this.ingredientUpdatedSource.next(response.item);
          this.messageService.create('success', 'Ingredient Updated');
        }
      },
      (err) => {
        console.log('error', 'Error loading Update Ingredient : ' + err.error.message);
        this.messageService.create('error', 'Error loading Create Ingredient : ' + err.error.message);
      });
  }

  addIngredient(title: string) {

    const body = new URLSearchParams();
    body.set('title', title);

    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    this.http.post<any>(this.apiUrl + '/recipe-form/add-ingredient', body.toString(), options).subscribe(response => {
      if (response && response.item) {
        this.ingredientCreatedSource.next(response.item);
        this.messageService.create('success', 'Ingredient created');
      }
    },
    (err) => {
      console.log('error', 'Error loading Create Ingredient : ' + err.error.message);
      this.messageService.create('error', 'Error loading Create Ingredient : ' + err.error.message);
    });
  }

  removeIngredientFromRecipe(ingredientId: number, recipeId: number) {

    const body = new URLSearchParams();
    body.set('ingredient_id', String(ingredientId));
    body.set('recipe_id', String(recipeId));

    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    this.http.post<any>(this.apiUrl + '/recipe-form/remove-ingredient-from-recipe', body.toString(), options).subscribe(response => {
      if (response) {
        this.ingredientRemovedSource.next(response);
        this.messageService.create('success', 'Ingredient Removed');
      }
    },
    (err) => {
      console.log('error', 'Error loading Remove Ingredient : ' + err.error.message);
      this.messageService.create('error', 'Error loading Remove Ingredient : ' + err.error.message);
    });
  }

  updateRecipeIngredients(ingredients: number[], recipeId: number) {

    const body = new URLSearchParams();
    let i = 0;
    ingredients.forEach(function getItem(item) {
      body.set('ingredients[' + i + ']', String(item));
      i++;
    });
    body.set('recipe_id', String(recipeId));

    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    this.http.post<any>(this.apiUrl + '/recipe-form/update-recipe-ingredients', body.toString(), options).subscribe(response => {
      if (response) {
        this.recipeIngredientsUpdatedSource.next(response);
        this.messageService.create('success', 'Recipe Ingredients Updated');
      }
    },
    (err) => {
      console.log('error', 'Error loading Update Recipe Ingredients : ' + err.error.message);
      this.messageService.create('error', 'Error loading Update Ingredients : ' + err.error.message);
    });
  }
}
