import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RecipeFormComponent} from './pages/recipe-form/recipe-form.component';
import {IngredientFormComponent} from './pages/ingredient-form/ingredient-form.component';
import {HomeInventoryComponent} from './pages/home-inventory/home-inventory.component';
import {TopRecipesComponent} from './pages/top-recipes/top-recipes.component';
import {EditRecipeFormComponent} from './pages/edit-recipe-form/edit-recipe-form.component';
import {UpdateIngredientsComponent} from './pages/update-ingredients/update-ingredients.component';
import {ShoppingListComponent} from './pages/shopping-list/shopping-list.component';
import {IngredientsByPriceComponent} from './pages/ingredients-by-price/ingredients-by-price.component';


//*/
const routes: Routes = [
  {
    path: '',
    component: RecipeFormComponent
  },
  {
    path: 'edit-recipe/:id',
    component: EditRecipeFormComponent
  },
  {
    path: 'ingredient-form',
    component: IngredientFormComponent
  },
  {
    path: 'update-ingredients',
    component: UpdateIngredientsComponent
  },
  {
    path: 'home-inventory',
    component: HomeInventoryComponent
  },
  {
    path: 'top-recipes',
    component: TopRecipesComponent
  },
  {
    path: 'shopping-list',
    component: ShoppingListComponent
  },
  {
    path: 'ingredients-by-price',
    component: IngredientsByPriceComponent
  }
];
/*/
const routes: Routes = [];
//*/

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
