import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import { siteSettings } from '../models/site-settings';
import {Recipe} from '../models/recipe-form';
import {NzMessageService} from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class RecipeFormService {

  private recipeCreated: any = {};
  private recipeCreatedSource = new BehaviorSubject(this.recipeCreated);
  public recipeCreatedList = this.recipeCreatedSource.asObservable();

  private recipeUpdated: any = {};
  private recipeUpdatedSource = new BehaviorSubject(this.recipeUpdated);
  public recipeUpdatedList = this.recipeUpdatedSource.asObservable();

  private proteinItems: any = {};
  private proteinSource = new BehaviorSubject(this.proteinItems);
  public proteinList = this.proteinSource.asObservable();

  private recipeStyleItems: any = {};
  private recipeStyleSource = new BehaviorSubject(this.recipeStyleItems);
  public recipeStyleList = this.recipeStyleSource.asObservable();

  private tasteLevelItems: any = {};
  private tasteLevelSource = new BehaviorSubject(this.tasteLevelItems);
  public tasteLevelList = this.tasteLevelSource.asObservable();

  private recipeItem: any = {};
  private recipeSource = new BehaviorSubject(this.recipeItem);
  public recipeListItem = this.recipeSource.asObservable();

  private difficultyLevelsItems: any = {};
  private difficultyLevelsSource = new BehaviorSubject(this.difficultyLevelsItems);
  public difficultyLevelsList = this.difficultyLevelsSource.asObservable();

  private apiUrl = siteSettings.apiUrl;

  constructor(
    private http: HttpClient,
    private messageService: NzMessageService
  ) { }

  setBody(recipeItem: Recipe) {

    const body = new URLSearchParams();
    body.set('title', recipeItem.title);
    if (recipeItem.rating) {
      body.set('rating', recipeItem.rating);
    }
    if (recipeItem.last_date_made) {
      body.set('last_date_made', String(recipeItem.last_date_made.getTime() / 1000));
    }
    body.set('contains_salad', ((recipeItem.contains_salad) ? '1' : '0'));
    body.set('contains_gluten', ((recipeItem.contains_gluten) ? '1' : '0'));
    if (recipeItem.protein_id) {
      body.set('protein_id', String(recipeItem.protein_id));
    }
    if (recipeItem.recipe_style_id) {
      body.set('recipe_style_id', String(recipeItem.recipe_style_id));
    }
    if (recipeItem.difficulty_level_id) {
      body.set('difficulty_level_id', String(recipeItem.difficulty_level_id));
    }
    if (recipeItem.taste_level_id) {
      body.set('taste_level_id', String(recipeItem.taste_level_id));
    }
    body.set('is_homechef', ((recipeItem.is_homechef) ? '1' : '0'));
    body.set('is_easy', ((recipeItem.is_easy) ? '1' : '0'));
    return body;
  }

  createRecipe(recipeItem: Recipe) {

    const body = this.setBody(recipeItem);

    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    this.http.post<any>(this.apiUrl + '/recipe-form/create', body.toString(), options).subscribe(response => {
      if (response) {
        this.recipeCreatedSource.next(response);
        this.messageService.create('success', `Recipe created`);
      }
    },
    (err) => {
      console.log('error', 'Error loading Create Recipe : ' + err.error.message);
      this.messageService.create('error', 'Error loading Create Recipe : ' + err.error.message);
    });
  }

  updateRecipe(recipeItem: Recipe, id: number) {

    if (!id) {
      return;
    }

    const body = this.setBody(recipeItem);

    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    this.http.post<any>(this.apiUrl + '/recipe-form/update?id=' + id, body.toString(), options).subscribe(response => {
        if (response) {
          this.recipeUpdatedSource.next(response);
          this.messageService.create('success', `Recipe updated`);
        }
      },
      (err) => {
        console.log('error', 'Error loading Update Recipe : ' + err.error.message);
        this.messageService.create('error', 'Error loading Update Recipe : ' + err.error.message);
      });
  }

  getRecipe(id) {

    if (!id) {
      return;
    }

    return this.http.get<any>(this.apiUrl + '/recipe-form/view?id=' + id).subscribe(response => {
        if (response && response.item) {
          if (response.item.last_date_made) {
            response.item.last_date_made = new Date(response.item.last_date_made);
          }
          response.item.contains_gluten = (response.item.contains_gluten) ? true : false;
          response.item.contains_salad = (response.item.contains_salad) ? true : false;
          response.item.is_homechef = (response.item.is_homechef) ? true : false;
          response.item.is_easy = (response.item.is_easy) ? true : false;
          this.recipeSource.next(response);
        }
      },
      (err) => {
        console.log('error', 'Error loading Get Recipe : ' + err.error.message);
      });
  }

  getProteins() {

    this.http.get<any>(this.apiUrl + '/recipe-form/proteins').subscribe(response => {
      this.proteinSource.next(response);
    },
    (err) => {
      console.log('error', 'Error loading Get Proteins : ' + err.error.message);
    });
  }

  getRecipeStyles() {

    this.http.get<any>(this.apiUrl + '/recipe-form/recipe-styles').subscribe(response => {
        this.recipeStyleSource.next(response);
      },
      (err) => {
        console.log('error', 'Error loading Get Recipe Styles : ' + err.error.message);
      });
  }

  getTasteLevels() {

    this.http.get<any>(this.apiUrl + '/recipe-form/taste-levels').subscribe(response => {
        this.tasteLevelSource.next(response);
      },
      (err) => {
        console.log('error', 'Error loading Get Taste Levels : ' + err.error.message);
      });
  }

  getDifficultyLevels() {

    this.http.get<any>(this.apiUrl + '/recipe-form/difficulty-levels').subscribe(response => {
        this.difficultyLevelsSource.next(response);
      },
      (err) => {
        console.log('error', 'Error loading Get Difficulty Levels : ' + err.error.message);
      });
  }
}
