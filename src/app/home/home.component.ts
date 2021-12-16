import { Component, OnInit } from '@angular/core';
import { AnimalTypesService } from '../animal-types.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(public animalTypesService: AnimalTypesService) {}

  ngOnInit(): void {
    this.animalTypesService
      .getToken()
      .subscribe((data) => console.log(data));
  }
}
