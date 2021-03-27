import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import { RecipeFormComponent } from './pages/recipe-form/recipe-form.component';
import { IngredientFormComponent } from './pages/ingredient-form/ingredient-form.component';
import { HomeInventoryComponent } from './pages/home-inventory/home-inventory.component';
import { TopRecipesComponent } from './pages/top-recipes/top-recipes.component';
import { EditRecipeFormComponent } from './pages/edit-recipe-form/edit-recipe-form.component';
import { UpdateIngredientsComponent } from './pages/update-ingredients/update-ingredients.component';
import { SelectRecipeComponent } from './components/select-recipe/select-recipe.component';
import { ShoppingListComponent } from './pages/shopping-list/shopping-list.component';
import { IngredientsByPriceComponent } from './pages/ingredients-by-price/ingredients-by-price.component';
import {OAuthModule} from 'angular-oauth2-oidc';
import {AuthGuard} from './authguard';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    RecipeFormComponent,
    IngredientFormComponent,
    HomeInventoryComponent,
    TopRecipesComponent,
    EditRecipeFormComponent,
    UpdateIngredientsComponent,
    SelectRecipeComponent,
    ShoppingListComponent,
    IngredientsByPriceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: [environment.apiUrl],
        sendAccessToken: true
      }
    }),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule
  ],
  providers: [
    AuthGuard,
    { provide: NZ_I18N, useValue: en_US}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
