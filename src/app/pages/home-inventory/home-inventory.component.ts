import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../models/recipe-form';
import {IngredientFormService} from '../../services/ingredient-form.service';
import {Subscription} from 'rxjs';
import {HomeInventoryService} from '../../services/home-inventory.service';
import {NzSelectComponent} from 'ng-zorro-antd';

@Component({
  selector: 'app-home-inventory',
  templateUrl: './home-inventory.component.html',
  styleUrls: ['./home-inventory.component.scss']
})
export class HomeInventoryComponent implements OnInit, OnDestroy {

  @ViewChild('ingredientSelect', {read: NzSelectComponent}) ingredientSelect: NzSelectComponent;

  subs: Subscription[] = [];
  showPopover = false;

  ingredientItems: Ingredient[] = [];
  homeInventoryItems: Ingredient[] = [];

  selectedIngredientItems: Ingredient[] = [];
  selectedIngredientSize = 0;

  constructor(
    private ingredientFormService: IngredientFormService,
    private homeInventoryService: HomeInventoryService
  ) { }

  ngOnInit(): void {

    this.subs.push(this.ingredientFormService.ingredientList.subscribe(response => {
      if (response.items) {
        this.ingredientItems = response.items;
      }
    }));

    this.subs.push(this.homeInventoryService.homeInventoryList.subscribe(response => {
      if (response.items) {
        this.homeInventoryItems = response.items;
        this.ingredientSelect.nzOpen = false;
      }
    }));

    this.subs.push(this.homeInventoryService.ingredientRemovedListItem.subscribe(response => {
      if (response) {
        this.homeInventoryService.getHomeInventory();
      }
    }));

    this.subs.push(this.homeInventoryService.homeIngredientsUpdatedListItem.subscribe(response => {
      if (response) {
        this.homeInventoryService.getHomeInventory();
      }
    }));

    this.ingredientFormService.getIngredients();
    this.homeInventoryService.getHomeInventory();
  }

  updateIngredientItems(ingredientItems: Ingredient[]) {


    const ingredientsArr: number[] = [];

    ingredientItems.forEach(function getItem(ingred) {
      if (ingredientsArr.indexOf(ingred.id) === -1) {
        ingredientsArr.push(ingred.id);
      }
    });

    this.homeInventoryService.updateRecipeIngredients(ingredientsArr);
  }

  removeIngredient(ingredientId: number) {

    this.homeInventoryService.removeIngredient(ingredientId);
  }

  ngOnDestroy() {
    let sub = this.subs.pop();
    while (sub) {
      sub.unsubscribe();
      sub = this.subs.pop();
    }
  }
}
