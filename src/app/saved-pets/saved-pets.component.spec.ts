import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedPetsComponent } from './saved-pets.component';

describe('SavedPetsComponent', () => {
  let component: SavedPetsComponent;
  let fixture: ComponentFixture<SavedPetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedPetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedPetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
