import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RecipeFormComponent} from './pages/recipe-form/recipe-form.component';
import {IngredientFormComponent} from './pages/ingredient-form/ingredient-form.component';
import {HomeInventoryComponent} from './pages/home-inventory/home-inventory.component';
import {TopRecipesComponent} from './pages/top-recipes/top-recipes.component';


//*/
const routes: Routes = [
  { path: '', component: RecipeFormComponent },
  { path: 'ingredient-form', component: IngredientFormComponent },
  { path: 'home-inventory', component: HomeInventoryComponent },
  { path: 'top-recipes', component: TopRecipesComponent },
];
/*/
const routes: Routes = [];
//*/

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
