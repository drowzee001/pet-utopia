import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimalTypesService } from '../animal-types.service';
import { AuthService } from '../auth.service';
import { savedPet, SavedPetsService } from '../saved-pets.service';

@Component({
  selector: 'app-saved-pets',
  templateUrl: './saved-pets.component.html',
  styleUrls: ['./saved-pets.component.css'],
})
export class SavedPetsComponent implements OnInit {
  savedPets: any[] = [];

  constructor(
    private authService: AuthService,
    private route: Router,
    private savedPetsService: SavedPetsService,
    private animalTypesService: AnimalTypesService
  ) {}

  ngOnInit(): void {
    if (!this.authService.loggedIn) {
      this.route.navigate(['login']);
    }
    this.savedPetsService.savedPets.subscribe((res) => {
      this.savedPets = [];
      if (res.length > 0) {
        res.map(async (savedPet) => {
          this.animalTypesService
            .getAnimal(savedPet.animal_id)
            .then((animal) => {
              this.savedPets.push(animal);
            });
        });
      }
    });
  }
  deletePet(id: string) {
    this.savedPetsService.deletePet(id);
  }
}
