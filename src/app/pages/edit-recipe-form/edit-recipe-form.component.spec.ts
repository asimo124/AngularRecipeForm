import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRecipeFormComponent } from './edit-recipe-form.component';

describe('CreateRecipeFormComponent', () => {
  let component: EditRecipeFormComponent;
  let fixture: ComponentFixture<EditRecipeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRecipeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRecipeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
