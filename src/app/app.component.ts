import {Component, OnInit} from '@angular/core';
import {RecipeFormService} from './services/recipe-form.service';
import {Subscription} from 'rxjs';
import {Recipe} from './models/recipe-form';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  subs: Subscription[] = [];



  proteinItems = [];
  difficultyLevelItems = [];

  recipeItem: Recipe = {
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

  titleInvalid = false;

  constructor(
    private recipeFormService: RecipeFormService,
    private messageService: NzMessageService
              ) {

  }

  ngOnInit(): void {

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
      if (response) {
        this.recipeItem = {
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
}
