import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimalTypesService } from '../animal-types.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public types: any[] = [];

  zipcode = new FormControl('');
  type = new FormControl('');
  error = '';

  constructor(
    public animalTypesService: AnimalTypesService,
    public router: Router
  ) {}

  ngOnInit(): void {
    // console.log(this.animalTypesService.getToken());
    this.animalTypesService
      .getAnimalTypes()
      .then((types) => (this.types = types));

    // this.animalTypesService
    //   .getAnimalTypes()
    //   .subscribe((data) => console.log(data));
  }

  onSubmit(): void {
    if (this.zipcode.value === '' || this.type.value === '') {
      this.error = 'Please enter all inputs';
    } else {
      this.router.navigate(['/search'], {
        queryParams: { zipcode: this.zipcode.value, type: this.type.value },
      });
    }
  }
}
