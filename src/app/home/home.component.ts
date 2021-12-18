import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimalsService } from '../animals.service';

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

  constructor(public animalsService: AnimalsService, public router: Router) {}

  ngOnInit(): void {
    this.animalsService
      .getAnimalTypes()
      .then((types: any) => (this.types = types));
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
