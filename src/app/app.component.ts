import {Component, OnInit} from '@angular/core';
import {RecipeFormService} from './services/recipe-form.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'recipe-form';

  subs: Subscription[] = [];

  constructor(private recipeFormService: RecipeFormService) {

  }

  ngOnInit(): void {

    // get and subscribe to Used Items List
    this.subs.push(this.recipeFormService.recipeCreatedList.subscribe(response => {
      if (response) {
        console.log(response);
      }
    }));

    this.recipeFormService.createRecipe();
  }

  submitForm() {

  }
}
