import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NzSelectComponent} from 'ng-zorro-antd';
import {Subscription} from 'rxjs';
import {Ingredient} from '../../models/recipe-form';
import {IngredientFormService} from '../../services/ingredient-form.service';
import {HomeInventoryService} from '../../services/home-inventory.service';

@Component({
  selector: 'app-update-ingredients',
  templateUrl: './update-ingredients.component.html',
  styleUrls: ['./update-ingredients.component.scss']
})
export class UpdateIngredientsComponent implements OnInit, OnDestroy {

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

    this.ingredientFormService.getIngredients();
  }

  showModifyIngredientPrice(rowIndex: number) {
    this.ingredientItems[rowIndex].is_modifying = true;
  }

  updateIngredientPrice(ingredient: Ingredient, rowIndex: number) {

    this.ingredientFormService.updateIngredient(ingredient, ingredient.id);

    this.ingredientItems[rowIndex].is_modifying = false;
  }

  ngOnDestroy() {
    let sub = this.subs.pop();
    while (sub) {
      sub.unsubscribe();
      sub = this.subs.pop();
    }
  }

}
