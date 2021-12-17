import { TestBed } from '@angular/core/testing';

import { SavedPetsService } from './saved-pets.service';

describe('SavedPetsService', () => {
  let service: SavedPetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavedPetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
