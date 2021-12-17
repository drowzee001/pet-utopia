import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimalTypesService } from '../animal-types.service';
import { SavedPetsService } from '../saved-pets.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  zipcode: string;
  type: string;
  animals: [];
  pagination: [];

  constructor(
    private route: ActivatedRoute,
    private animalTypesService: AnimalTypesService,
    private savedPetsService: SavedPetsService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.zipcode = params['zipcode'];
      this.type = params['type'];
    });
    this.animalTypesService.getAnimals(this.zipcode, this.type).then((data) => {
      this.animals = data.animals;
      this.pagination = data.pagination;
    });
  }

  savePet(element: any, id: string) {
    this.savedPetsService.savePet(id);
    element.textContent = "Saved!"
  }
}
