import { TestBed } from '@angular/core/testing';

import { AnimalTypesService } from './animal-types.service';

describe('AnimalTypesService', () => {
  let service: AnimalTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimalTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
