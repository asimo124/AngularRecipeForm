import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';
import {BehaviorSubject} from 'rxjs';
import {siteSettings} from '../models/site-settings';
import {Ingredient} from '../models/recipe-form';

@Injectable({
  providedIn: 'root'
})
export class HomeInventoryService {

  private homeInventoryItems: any = [];
  private homeInventorySource = new BehaviorSubject(this.homeInventoryItems);
  public homeInventoryList = this.homeInventorySource.asObservable();

  private ingredientRemovedItem: Ingredient = null;
  private ingredientRemovedSource = new BehaviorSubject(this.ingredientRemovedItem);
  public ingredientRemovedListItem = this.ingredientRemovedSource.asObservable();

  private homeIngredientsUpdatedItem: Ingredient = null;
  private homeIngredientsUpdatedSource = new BehaviorSubject(this.homeIngredientsUpdatedItem);
  public homeIngredientsUpdatedListItem = this.homeIngredientsUpdatedSource.asObservable();

  private apiUrl = siteSettings.apiUrl;

  constructor(
    private http: HttpClient,
    private messageService: NzMessageService
  ) { }

  getHomeInventory() {

    this.http.get<any>(this.apiUrl + '/home-inventory-form/home-inventory').subscribe(response => {
      this.homeInventorySource.next(response);
    },
    (err) => {
      console.log('error', 'Error loading Get Home Inventory Items : ' + err.error.message);
    });
  }

  removeIngredient(ingredientId: number) {

    const body = new URLSearchParams();
    body.set('ingredient_id', String(ingredientId));

    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    this.http.post<any>(this.apiUrl + '/home-inventory-form/remove-ingredient', body.toString(), options).subscribe(response => {
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

  updateRecipeIngredients(ingredients: number[]) {

    const body = new URLSearchParams();
    let i = 0;
    ingredients.forEach(function getItem(item) {
      body.set('ingredients[' + i + ']', String(item));
      i++;
    });

    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    this.http.post<any>(this.apiUrl + '/home-inventory-form/update-recipe-ingredients', body.toString(), options).subscribe(response => {
        if (response) {
          this.homeIngredientsUpdatedSource.next(response);
          this.messageService.create('success', 'Home Inventory Ingredients Updated');
        }
      },
      (err) => {
        console.log('error', 'Error loading Update Home Inventory Ingredients : ' + err.error.message);
        this.messageService.create('error', 'Error loading Update Ingredients : ' + err.error.message);
      });
  }
}
