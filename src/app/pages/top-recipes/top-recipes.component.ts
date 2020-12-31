import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {Recipe} from '../../models/recipe-form';
import {IngredientFormService} from '../../services/ingredient-form.service';
import {TopRecipesService} from '../../services/top-recipes.service';
import {siteSettings} from '../../models/site-settings';
import {RecipeFormService} from '../../services/recipe-form.service';
import {TopRecipeFilters} from '../../models/top-recipes';

@Component({
  selector: 'app-top-recipes',
  templateUrl: './top-recipes.component.html',
  styleUrls: ['./top-recipes.component.scss']
})
export class TopRecipesComponent implements OnInit {

  subs: Subscription[] = [];

  topRecipeItems: Recipe[] = [];

  filters: TopRecipeFilters = {
    proteinId: 0,
    frugalMode: null,
    isSalad: null,
    isHomechef: null,
    isEasy: null,
  };

  proteinItems: any[] = [];

  apiUrl = siteSettings.apiUrl;

  constructor(
    private ingredientFormService: IngredientFormService,
    private recipeFormService: RecipeFormService,
    private topRecipesService: TopRecipesService
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

    this.searchRecipes();
    this.recipeFormService.getProteins();
  }

  searchRecipes() {
    this.topRecipesService.getTopRecipes(this.filters);
  }
}
