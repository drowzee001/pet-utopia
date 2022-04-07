import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimalsService } from '../animals.service';
import { AuthService } from '../auth.service';
import { SavedPetsService } from '../saved-pets.service';

interface pet {
  animal_data: any;
  saved: boolean;
  doc_id?: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  zipcode: string;
  type: string;
  page: string = '1';
  animals: pet[] = [];
  pagination: any = [];
  current_page: number;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    public authService: AuthService,
    private animalTypesService: AnimalsService,
    private sanitizer: DomSanitizer,
    private savedPetsService: SavedPetsService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.loading = true;
      this.pagination = [];
      this.animals = [];

      this.zipcode = params['zipcode'];
      this.type = params['type'];
      if (params['page']) this.page = params['page'];

      this.animalTypesService
        .getAnimals(this.zipcode, this.type, this.page)
        .then((data) => {
          if (authService.loggedIn === true) {
            this.savedPetsService.savedPets$.subscribe((savedPets) => {
              data.animals.forEach((animal: { [x: string]: string }) => {
                let saved = false;
                let doc_id = '';
                savedPets.forEach((savedPet) => {
                  if (savedPet.animal_id === animal['id']) { 
                    saved = true;
                    doc_id = savedPet.doc_id;
                  }
                });
                this.animals.push({ animal_data: animal, saved, doc_id });
              });
            });
          } else {
            let saved = false;
            data.animals.forEach((animal: { [x: string]: string }) => {
              this.animals.push({ animal_data: animal, saved });
            });
          }

          this.current_page = data.pagination.current_page;
          if (data.pagination.current_page > 5) {
            for (
              let i = data.pagination.current_page - 4;
              i < data.pagination.current_page + 5;
              i++
            ) {
              this.pagination.push(i);
            }
          } else {
            for (let i = 1; i < 10; i++) {
              this.pagination.push(i);
            }
          }
          this.loading = false;
        });
    });
  }

  ngOnInit(): void {}

  savePet(element: any, id: string) {
    if (this.authService.loggedIn) {
      this.savedPetsService.savePet(id);
      element.textContent = 'Saved!';
    }
  }
  deletePet(element: any, id: any) { 
    this.savedPetsService.deletePet(id);
    element.textContent = 'Save Pet';
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) {}
  transform(value: string) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}
