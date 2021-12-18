import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AnimalsService } from '../animals.service';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css'],
})
export class AnimalComponent implements OnInit {
  id: string;
  animal: any;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private animalsService: AnimalsService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.animalsService.getAnimal(this.id).then((animal) => {
        this.animal = animal;
        this.loading = false;
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
