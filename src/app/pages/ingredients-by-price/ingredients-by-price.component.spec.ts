import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsByPriceComponent } from './ingredients-by-price.component';

describe('IngredientsByPriceComponent', () => {
  let component: IngredientsByPriceComponent;
  let fixture: ComponentFixture<IngredientsByPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientsByPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientsByPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
