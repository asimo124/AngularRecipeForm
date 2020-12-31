import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';
import {siteSettings} from '../models/site-settings';
import {TopRecipeFilters} from '../models/top-recipes';

@Injectable({
  providedIn: 'root'
})
export class TopRecipesService {

  private topRecipeItems: any[] = [];
  private topRecipeSource = new BehaviorSubject(this.topRecipeItems);
  public topRecipeList = this.topRecipeSource.asObservable();

  private apiUrl = siteSettings.apiUrl;

  constructor(
    private http: HttpClient,
    private messageService: NzMessageService
  ) { }

  buildParams(filters: TopRecipeFilters) {

    let params = '';
    if (filters.proteinId) {
      params = 'protein_id=' + filters.proteinId + '&';
    }
    if (filters.frugalMode !== null) {
      params += 'frugal_mode=' + ((filters.frugalMode) ? '1' : '0') + '&';
    }
    if (filters.isSalad !== null) {
      params += 'contains_salad=' + ((filters.isSalad) ? '1' : '0') + '&';
    }
    if (filters.isHomechef !== null) {
      params += 'is_homechef=' + ((filters.isHomechef) ? '1' : '0') + '&';
    }
    if (filters.isEasy !== null) {
      params += 'is_easy=' + ((filters.isEasy) ? '1' : '0') + '&';
    }
    return params;
  }

  getTopRecipes(filters: TopRecipeFilters) {

    const params = this.buildParams(filters);

    this.http.get<any>(this.apiUrl + '/top-recipes/top-recipes?' + params).subscribe(response => {
      if (response && response.items) {
        this.topRecipeSource.next(response.items);
      }
    },
    (err) => {
      console.log('error', 'Error loading Top Recipes : ' + err.error.message);
    });
  }
}
