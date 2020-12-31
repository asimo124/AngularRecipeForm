import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient, Recipe} from '../../models/recipe-form';
import {IngredientFormService} from '../../services/ingredient-form.service';
import {Subscription} from 'rxjs';
import {RecipeFormService} from '../../services/recipe-form.service';
import {NzSelectComponent} from 'ng-zorro-antd';

@Component({
  selector: 'app-ingredient-form',
  templateUrl: './ingredient-form.component.html',
  styleUrls: ['./ingredient-form.component.scss']
})
export class IngredientFormComponent implements OnInit, OnDestroy {

  @ViewChild('ingredientSelect', {read: NzSelectComponent}) ingredientSelect: NzSelectComponent;

  subs: Subscription[] = [];
  showPopover = false;

  recipeItems: Recipe[] = [];
  ingredientItems = [];

  recipeItem: Recipe = {
    id: 0,
    title: '',
    rating: '',
    lastDateMade: new Date(),
    containsSalad: false,
    containsGluten: false,
    proteinId: 0,
    difficultyLevelId: 0,
    isHomeChef: false,
    isEasy: false,
    riRecipeIngredients: []
  };

  newIngredientTitle = '';

  selectedIngredientItems: Ingredient[] = [];
  selectedIngredientSize = 0;

  newIngredientItem: any = {
    id: 0,
    title: '',
    ingredient_type_id: 0,
    price: 0
  };

  constructor(
    private ingredientFormService: IngredientFormService,
  ) { }

  ngOnInit(): void {

    this.subs.push(this.ingredientFormService.recipeList.subscribe(response => {
      if (response.items) {
        this.recipeItems = response.items;

        if (this.recipeItem && this.recipeItem.id) {
          console.log('did re-check recipe item');
          this.recipeItem.riRecipeIngredients = [];
          const recipeItem = this.recipeItem;
          this.recipeItem = null;
          const self = this;
          this.recipeItems.forEach(function getItem(item) {
            if (item.id == recipeItem.id) {
              self.selectedIngredientItems = null;
              self.selectedIngredientItems = [];
              self.recipeItem = item;
              item.riRecipeIngredients.forEach(function getIngred(ingred) {
                self.selectedIngredientItems.push(ingred.ingredient);
              });
            }
          });
        } else {

          const newRecipeItemId = parseInt(localStorage.getItem('newRecipeItemId'), 10);
          if (newRecipeItemId) {
            const self = this;
            this.recipeItems.forEach(function getItem(item) {
              if (item.id == newRecipeItemId) {
                self.selectedIngredientItems = null;
                self.selectedIngredientItems = [];
                self.recipeItem = item;
                item.riRecipeIngredients.forEach(function getIngred(ingred) {
                  self.selectedIngredientItems.push(ingred.ingredient);
                });
              }
            });
          }
        }
        this.ingredientSelect.nzOpen = false;
      }
    }));

    this.subs.push(this.ingredientFormService.ingredientList.subscribe(response => {
      if (response.items) {
        this.ingredientItems = response.items;
      }
    }));

    this.subs.push(this.ingredientFormService.ingredientCreatedListItem.subscribe(response => {
      if (response) {
        this.ingredientFormService.getIngredients();
        this.newIngredientItem = response;
      }
    }));

    this.subs.push(this.ingredientFormService.ingredientRemovedListItem.subscribe(response => {
      if (response) {
        this.ingredientFormService.getRecipes();
      }
    }));

    this.subs.push(this.ingredientFormService.recipeIngredientsUpdatedListItem.subscribe(response => {
      if (response) {
        console.log('did come back from updated source');
        this.ingredientFormService.getRecipes();
      }
    }));

    this.ingredientFormService.getRecipes();
    this.ingredientFormService.getIngredients();
  }

  addNewIngredient() {

    this.ingredientFormService.addIngredient(this.newIngredientTitle);
    this.showPopover = false;
    this.newIngredientTitle = '';
  }

  selectedRecipe(recipeItem: Recipe) {


  }

  removeIngredient(ingredientId: number) {

    if (this.recipeItem.id) {
      this.ingredientFormService.removeIngredientFromRecipe(ingredientId, this.recipeItem.id);
    }
  }

  updateIngredientItems(ingredientItems: Ingredient[]) {

    if (this.recipeItem.id) {

      const ingredientsArr: number[] = [];

      this.recipeItem.riRecipeIngredients.forEach(function getItem(ingred) {
        console.log('ingred: ', ingred);
        ingredientsArr.push(ingred.ingredient.id);
      });

      console.log('ingredeintsArr: ', ingredientsArr);

      ingredientItems.forEach(function getItem(ingred) {
        if (ingredientsArr.indexOf(ingred.id) === -1) {
          ingredientsArr.push(ingred.id);
        }
      });

      this.ingredientFormService.updateRecipeIngredients(ingredientsArr, this.recipeItem.id);
    }
  }

  ngOnDestroy() {
    let sub = this.subs.pop();
    while (sub) {
      sub.unsubscribe();
      sub = this.subs.pop();
    }
  }
}
