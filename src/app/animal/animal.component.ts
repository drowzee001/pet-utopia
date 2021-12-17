import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AnimalTypesService } from '../animal-types.service';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css'],
})
export class AnimalComponent implements OnInit {
  id: string;
  animal: any;
  constructor(
    private route: ActivatedRoute,
    private animalTypesService: AnimalTypesService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.animalTypesService.getAnimal(this.id).then((animal) => {
        this.animal = animal;
        console.log(animal);
      });
    });
  }
  safeHTML(html: any) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
  replaceDash(str: any) { 
    return str.replace('_', ' ');
  }
}
