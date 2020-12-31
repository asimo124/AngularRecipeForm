import { TestBed } from '@angular/core/testing';

import { TopRecipesService } from './top-recipes.service';

describe('TopRecipesService', () => {
  let service: TopRecipesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopRecipesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
