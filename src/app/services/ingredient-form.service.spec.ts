import { TestBed } from '@angular/core/testing';

import { IngredientFormService } from './ingredient-form.service';

describe('IngredientFormService', () => {
  let service: IngredientFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngredientFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
