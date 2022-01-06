import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimalsService } from '../animals.service';
import { AuthService } from '../auth.service';
import { savedPet, SavedPetsService } from '../saved-pets.service';

@Component({
  selector: 'app-saved-pets',
  templateUrl: './saved-pets.component.html',
  styleUrls: ['./saved-pets.component.css'],
})
export class SavedPetsComponent implements OnInit {
  savedPets: any[] = [];
  loading: boolean = true;

  constructor(
    private authService: AuthService,
    private route: Router,
    private savedPetsService: SavedPetsService,
    private animalsService: AnimalsService
  ) {}

  ngOnInit(): void {
    if (!this.authService.loggedIn) {
      this.route.navigate(['login']);
    } else {
      this.savedPetsService.savedPets.subscribe((res) => {
        this.savedPets = [];

        const requests = res.map((savedPet) => {
          return this.animalsService
            .getAnimal(savedPet.animal_id)
            .then((animal: any) => {
              this.savedPets.push({
                animal: animal,
                doc_id: savedPet.doc_id,
              });
            });
        });

        if (res.length > 0) {
          Promise.all(requests).then(() => {
            this.loading = false;
          });
        }
      });
    }
  }
  deletePet(id: string) {
    this.savedPetsService.deletePet(id);
  }
}
