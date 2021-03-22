import { Component, OnInit } from '@angular/core';
import {TopRecipesService} from '../../services/top-recipes.service';
import {Subscription} from 'rxjs';
import {IngredientByPrice} from '../../models/top-recipes';

@Component({
  selector: 'app-ingredients-by-price',
  templateUrl: './ingredients-by-price.component.html',
  styleUrls: ['./ingredients-by-price.component.scss']
})
export class IngredientsByPriceComponent implements OnInit {

  subs: Subscription[] = [];

  ingredientsList: any[] = [];

  constructor(
    private topRecipesService: TopRecipesService
  ) { }

  ngOnInit(): void {

    this.subs.push(this.topRecipesService.ingredientsByPriceList.subscribe(response => {
      if (response) {
        this.ingredientsList = response;
        console.log('this.ingredientsList: ', this.ingredientsList);
      }
    }));

    this.topRecipesService.getIngredientsByPrice();
  }

}
