import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Recipe} from '../../models/recipe-form';
import {RecipeFormService} from '../../services/recipe-form.service';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent implements OnInit, OnDestroy {

  subs: Subscription[] = [];

  proteinItems = [];
  difficultyLevelItems = [];

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
  };

  newRecipeItem: Recipe = null;

  titleInvalid = false;

  constructor(
    private recipeFormService: RecipeFormService,
    private messageService: NzMessageService
  ) {

  }

  ngOnInit(): void {

    localStorage.removeItem('newRecipeItemId');

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

    // get and subscribe to Recipe Created List
    this.subs.push(this.recipeFormService.recipeCreatedList.subscribe(response => {
      if (response && response.item) {
        this.recipeItem = {
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
        };

        localStorage.setItem('newRecipeItemId', response.item.id);
      }
    }));

    this.recipeFormService.getProteins();
    this.recipeFormService.getDifficultyLevels();
  }

  onDateChange(date2) {

  }

  validateForm() {

    this.titleInvalid = false;

    if (!this.recipeItem.title) {
      this.titleInvalid = true;
      return false;
    }
    return true;
  }

  submitForm() {

    if (!this.validateForm()) {
      this.messageService.create('error', 'Missing required fields');
    } else {
      this.recipeFormService.createRecipe(this.recipeItem);
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
