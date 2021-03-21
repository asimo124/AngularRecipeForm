import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Recipe} from '../../models/recipe-form';
import {RecipeFormService} from '../../services/recipe-form.service';
import {NzMessageService} from 'ng-zorro-antd';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit-recipe-form',
  templateUrl: './edit-recipe-form.component.html',
  styleUrls: ['./edit-recipe-form.component.scss']
})
export class EditRecipeFormComponent implements OnInit, OnDestroy {

  subs: Subscription[] = [];

  proteinItems = [];
  tasteLevelItems = [];
  recipeStyleItems = [];
  difficultyLevelItems = [];

  recipeItem: Recipe = {
    id: 0,
    title: '',
    rating: '',
    last_date_made: new Date(),
    contains_salad: false,
    contains_gluten: false,
    protein_id: 0,
    difficulty_level_id: 0,
    is_homechef: false,
    is_easy: false,
    recipe_style_id: 0,
    taste_level_id: 0,
    recipe_link: ''
  };

  validForm = true;
  titleInvalid = false;
  proteinInvalid = false;

  recipeId = 0;

  constructor(
    private recipeFormService: RecipeFormService,
    private messageService: NzMessageService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {

    localStorage.removeItem('newRecipeItemId');

    this.recipeId = Number(this.route.snapshot.paramMap.get('id'));

    this.subs.push(this.recipeFormService.recipeListItem.subscribe(response => {
      if (response.item) {
        this.recipeItem = response.item;

        this.recipeFormService.getProteins();
        this.recipeFormService.getRecipeStyles();
        this.recipeFormService.getDifficultyLevels();
        this.recipeFormService.getTasteLevels();
      }
    }));

    this.subs.push(this.recipeFormService.proteinList.subscribe(response => {
      if (response.items) {
        this.proteinItems = response.items;
      }
    }));

    this.subs.push(this.recipeFormService.recipeStyleList.subscribe(response => {
      if (response.items) {
        this.recipeStyleItems = response.items;
      }
    }));

    this.subs.push(this.recipeFormService.tasteLevelList.subscribe(response => {
      if (response.items) {
        this.tasteLevelItems = response.items;
      }
    }));

    this.subs.push(this.recipeFormService.difficultyLevelsList.subscribe(response => {
      if (response.items) {
        this.difficultyLevelItems = response.items;
      }
    }));

    // get and subscribe to Recipe Updated List
    this.subs.push(this.recipeFormService.recipeUpdatedList.subscribe(response => {
      if (response && response.item) {
        localStorage.setItem('newRecipeItemId', response.item.id);
      }
    }));

    this.recipeFormService.getRecipe(this.recipeId);
  }

  onDateChange(date2) {

  }

  validateForm() {

    this.validForm = true;

    if (!this.recipeItem.title) {
      this.titleInvalid = true;
      this.validForm = false;

    }
    if (!this.recipeItem.protein_id) {
      this.proteinInvalid = true;
      this.validForm = false;
    }
    return this.validForm;
  }

  submitForm() {

    if (!this.validateForm()) {
      this.messageService.create('error', 'Missing required fields');
    } else {
      this.recipeFormService.updateRecipe(this.recipeItem, this.recipeId);
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
