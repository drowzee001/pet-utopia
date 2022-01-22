import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimalsService } from '../animals.service';
import { AuthService } from '../auth.service';
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
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    public authService: AuthService,
    private animalTypesService: AnimalsService,
    private savedPetsService: SavedPetsService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.zipcode = params['zipcode'];
      this.type = params['type'];
    });
    this.animalTypesService.getAnimals(this.zipcode, this.type).then((data) => {
      this.animals = data.animals;
      console.log(data.pagination);
      this.pagination = data.pagination;
      this.loading = false;
    });
  }

  savePet(element: any, id: string) {
    if (this.authService.loggedIn) {
      this.savedPetsService.savePet(id);
      element.textContent = 'Saved!';
    }
  }
}
