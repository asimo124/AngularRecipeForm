import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {Recipe} from '../../models/recipe-form';
import {RecipeFormService} from '../../services/recipe-form.service';
import {IngredientFormService} from '../../services/ingredient-form.service';
import {Subject, Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {siteSettings} from '../../models/site-settings';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-select-recipe',
  templateUrl: './select-recipe.component.html',
  styleUrls: ['./select-recipe.component.scss']
})
export class SelectRecipeComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {

  @Input() currentRecipe: Recipe; // currently selected school
  @Input() setClose
  @Output() onSelection: EventEmitter<any> = new EventEmitter<string>();
  @ViewChild('select') select;

  recipeList: Recipe[] = [];
  filterList: any = {};
  isLoading: boolean = false;
  selectedRecipe: Recipe;

  runningRequest: Subscription;
  apiUrl = siteSettings.apiUrl;

  private recipeSearch = new Subject();
  private searchCaller: Subscription;

  constructor(
    private http: HttpClient,
    private ingredientFormService: IngredientFormService,
    private renderer: Renderer2
  ) { }

  ngOnInit() {

    this.searchCaller = this.recipeSearch.pipe(debounceTime(750)).subscribe(e => this.searchForRecipes());
  }

  ngOnChanges() {

    this.searchCaller = this.recipeSearch.pipe(debounceTime(750)).subscribe(e => this.searchForRecipes());
  }

  searchChanged(searchInput: any) {

    console.log('did call search Changed');
    if(this.runningRequest) { this.runningRequest.unsubscribe(); }
    this.filterList.search = searchInput;
    this.recipeSearch.next(searchInput);
  }

  searchForRecipes() {
    this.isLoading = true;
    if (this.runningRequest) {
      this.runningRequest.unsubscribe();
    }

    let apiParams = '';
    if (this.filterList?.search) {
      apiParams += 'search=' + encodeURIComponent(this.filterList.search) + '&';
    }

    this.runningRequest =  this.http.get<any>(this.apiUrl + '/recipe-form/recipes?' + apiParams).subscribe(response => {
      this.recipeList = response.items;
      this.selectedRecipe = this.currentRecipe;
      this.isLoading = false;
    },
    (err) => {
      console.log('error', 'Error loading Get Recipes : ' + err.error.message);
    });
  }

  recipeSelected(item) {
    this.currentRecipe = this.selectedRecipe;
    this.onSelection.emit(this.selectedRecipe);
  }

  ngOnDestroy(): void {
    if (this.runningRequest) { this.runningRequest.unsubscribe(); }
    if (this.searchCaller) { this.searchCaller.unsubscribe(); }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const allEles: any = document.querySelectorAll('nz-select nz-select-top-control nz-select-search input');
      for (const ele of allEles) {
        this.renderer.removeAttribute(ele, 'readonly');
      }
    }, 1500);

  }

  onBlur() {
    console.log('blur triggered');
    setTimeout(() => {
      const allEles: any = document.querySelectorAll('nz-select nz-select-top-control nz-select-search input');
      for (const ele of allEles) {
        this.renderer.removeAttribute(ele, 'readonly');
      }
    }, 500);
  }

}
