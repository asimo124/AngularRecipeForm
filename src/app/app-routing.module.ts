import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RecipeFormComponent} from './pages/recipe-form/recipe-form.component';
import {IngredientFormComponent} from './pages/ingredient-form/ingredient-form.component';
import {HomeInventoryComponent} from './pages/home-inventory/home-inventory.component';


//*/
const routes: Routes = [
  { path: '', component: RecipeFormComponent },
  { path: 'ingredient-form', component: IngredientFormComponent },
  { path: 'home-inventory', component: HomeInventoryComponent },
];
/*/
const routes: Routes = [];
//*/

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
