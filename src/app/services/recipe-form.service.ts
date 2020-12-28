import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import { siteSettings } from '../models/site-settings';

@Injectable({
  providedIn: 'root'
})
export class RecipeFormService {

  private recipeCreated = [];
  private recipeCreatedSource = new BehaviorSubject(this.recipeCreated);
  public recipeCreatedList = this.recipeCreatedSource.asObservable();

  private apiUrl = siteSettings.apiUrl;

  constructor(private http: HttpClient) { }

  createRecipe(daysBack: number = 0) {

    const requestParams = 'daysBack=' + daysBack;

    console.log(this.apiUrl + '/recipe-form/create');

    this.http.get<any>(this.apiUrl + '/recipe-form/create?' + requestParams).subscribe(response => {

        this.recipeCreatedSource.next(response);
      },
      (err) => {
        console.log('error', 'Error loading Create Recipe : ' + err.error.message);
      });
  }
}
