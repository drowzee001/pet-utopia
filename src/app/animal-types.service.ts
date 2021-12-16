import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AnimalTypesService {
  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  body = {
    grant_type: 'client_credentials',
    client_id: environment.apiKey,
    client_secret: environment.apiSecret,
  };
  getToken() {
    return this.http.post(
      environment.apiUrl + '/oath2/token',
      this.body,
      this.httpOptions
    );
  }
  getAnimalTypes() {
    return this.http.get(environment.apiUrl + '/types');
  }
}
