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

  private proteinItems: any = {};
  private proteinSource = new BehaviorSubject(this.proteinItems);
  public proteinList = this.proteinSource.asObservable();

  private difficultyLevelsItems: any = {};
  private difficultyLevelsSource = new BehaviorSubject(this.difficultyLevelsItems);
  public difficultyLevelsList = this.difficultyLevelsSource.asObservable();

  private apiUrl = siteSettings.apiUrl;

  constructor(
    private http: HttpClient,
    private messageService: NzMessageService
  ) { }

  createRecipe(recipeItem: Recipe) {

    const body = new URLSearchParams();
    body.set('title', recipeItem.title);
    body.set('rating', recipeItem.rating);
    body.set('last_date_made', String(recipeItem.lastDateMade.getTime() / 1000));
    body.set('contains_salad', ((recipeItem.containsSalad) ? '1' : '0'));
    body.set('contains_gluten', ((recipeItem.containsGluten) ? '1' : '0'));
    body.set('protein_id', String(recipeItem.proteinId));
    body.set('difficulty_level_id', String(recipeItem.difficultyLevelId));
    body.set('is_homechef', ((recipeItem.isHomeChef) ? '1' : '0'));
    body.set('is_easy', ((recipeItem.isEasy) ? '1' : '0'));

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

  getProteins() {

    this.http.get<any>(this.apiUrl + '/recipe-form/proteins').subscribe(response => {
      this.proteinSource.next(response);
    },
    (err) => {
      console.log('error', 'Error loading Get Proteins : ' + err.error.message);
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
