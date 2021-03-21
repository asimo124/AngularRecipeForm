import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Recipe} from '../../models/recipe-form';
import {IngredientFormService} from '../../services/ingredient-form.service';
import {TopRecipesService} from '../../services/top-recipes.service';
import {siteSettings} from '../../models/site-settings';
import {RecipeFormService} from '../../services/recipe-form.service';
import {TopRecipeFilters} from '../../models/top-recipes';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-top-recipes',
  templateUrl: './top-recipes.component.html',
  styleUrls: ['./top-recipes.component.scss']
})
export class TopRecipesComponent implements OnInit, OnDestroy {

  subs: Subscription[] = [];

  topRecipeItems: Recipe[] = [];

  displayMode = 'grid';

  filters: TopRecipeFilters = {
    proteinId: 0,
    difficultyLevelId: 0,
    tasteLevelId: 0,
    recipeStyleId: 0,
    sort1: '',
    sort_dir1: 'ASC',
    sort2: '',
    sort_dir2: 'ASC',
    sort3: '',
    sort_dir3: 'ASC'
  };

  proteinItems: any[] = [];
  difficultyLevelItems: any[] = [];
  tasteLevelItems: any[] = [];
  recipeStyleItems: any[] = [];

  apiUrl = siteSettings.apiUrl;

  constructor(
    private ingredientFormService: IngredientFormService,
    private recipeFormService: RecipeFormService,
    private topRecipesService: TopRecipesService,
    private messageService: NzMessageService
  ) { }

  ngOnInit(): void {

    this.subs.push(this.topRecipesService.topRecipeList.subscribe(response => {
      if (response) {
        this.topRecipeItems = response;
      }
    }));

    this.subs.push(this.recipeFormService.proteinList.subscribe(response => {
      if (response.items) {
        this.proteinItems = response.items;
      }
    }));

    this.subs.push(this.recipeFormService.difficultyLevelsList.subscribe(response => {
      if (response.items) {
        this.difficultyLevelItems = response.items;
      }
    }));

    this.subs.push(this.recipeFormService.tasteLevelList.subscribe(response => {
      if (response.items) {
        this.tasteLevelItems = response.items;
      }
    }));

    this.subs.push(this.recipeFormService.recipeStyleList.subscribe(response => {
      if (response.items) {
        this.recipeStyleItems = response.items;
      }
    }));

    this.searchRecipes();
    this.recipeFormService.getProteins();
    this.recipeFormService.getDifficultyLevels();
    this.recipeFormService.getTasteLevels();
    this.recipeFormService.getRecipeStyles();
  }

  searchRecipes() {
    this.topRecipesService.getTopRecipes(this.filters);
  }

  addToShoppingList(recipeIngredients, recipeId) {
    let hasShoppingList = false;
    let shoppingList = '';
    if (sessionStorage.getItem('shopping_list')) {
      shoppingList = sessionStorage.getItem('shopping_list');
      if (shoppingList) {
        hasShoppingList = true;
      }
    }
    let shoppingListItem = {
      recipes: []
    };
    if (hasShoppingList) {
      shoppingListItem = JSON.parse(shoppingList);
    }
    
    if (shoppingListItem.recipes.indexOf(recipeId) == -1) {
      shoppingListItem.recipes.push(recipeId);
    }
    sessionStorage.setItem('shopping_list', JSON.stringify(shoppingListItem));
    this.messageService.create('success', 'Added recipe to Shopping List');
  }

  ngOnDestroy() {
    let sub = this.subs.pop();
    while (sub) {
      sub.unsubscribe();
      sub = this.subs.pop();
    }
  }
}
