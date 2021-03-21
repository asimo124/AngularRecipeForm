import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {TopRecipesService} from '../../services/top-recipes.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {

  subs: Subscription[] = [];

  hasShoppingList = false;
  shoppingList: any;

  totalCost = 0;

  constructor(
    private topRecipesService: TopRecipesService
  ) { }

  ngOnInit(): void {

    this.subs.push(this.topRecipesService.shoppingListList.subscribe(response => {
      if (response?.items) {
        this.shoppingList = response.items;

        const self = this;
        this.totalCost = 0;
        this.shoppingList.forEach(function getItem(item) {
          self.totalCost += parseInt(item.price, 10);
        });
      }
    }));

    if (sessionStorage.getItem('shopping_list')) {
      const shoppingList = sessionStorage.getItem('shopping_list');
      if (shoppingList) {
        this.hasShoppingList = true;
      }
    }
    if (this.hasShoppingList) {
      this.topRecipesService.getShoppingList();
    }
  }

  copyFunction() {
    const copyText = document.getElementById('myInput').textContent;
    const textArea = document.createElement('textarea');
    textArea.textContent = copyText;
    document.body.append(textArea);
    textArea.select();
    document.execCommand('copy');
  }

  clearShoppingList() {
    sessionStorage.removeItem('shopping_list');
    this.hasShoppingList = false;
  }
}
