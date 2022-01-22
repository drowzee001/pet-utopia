import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import axios, { AxiosInstance } from 'axios';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, lastValueFrom, retry, throwError } from 'rxjs';
import { errorPrefix } from '@firebase/util';

@Injectable({
  providedIn: 'root',
})
export class AnimalsService {
  public http: AxiosInstance;
  private token: string;
  private headers: HttpHeaders;
  public types: [];

  constructor(private http2: HttpClient) {
    this.getToken();
  }

  handleError(error: HttpErrorResponse) {
    if (localStorage.getItem('petFinderToken')) {
      localStorage.removeItem('petFinderToken');
      this.getToken();
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something went wrong. Trying again'));
  }

  async getAnimalTypes() {
    try {
      const res: any = await lastValueFrom(
        this.http2.get('https://api.petfinder.com/v2/types', {
          headers: this.headers,
        })
      );
      return res.types;
    } catch (e) {
      if (localStorage.getItem('petFinderToken')) {
        localStorage.removeItem('petFinderToken');
        await this.getToken();
        const res: any = await lastValueFrom(
          this.http2.get('https://api.petfinder.com/v2/types', {
            headers: this.headers,
          })
        );
        return res.types;
      }
    }
  }

  async getAnimals(zipcode: string, type: string) {
    try {
      const res: any = await lastValueFrom(
        this.http2.get(
          `https://api.petfinder.com/v2/animals/?type=${type}&location=${zipcode}&sort=distance`,
          {
            headers: this.headers,
          }
        )
      );
      return res;
    } catch (e) {
      if (localStorage.getItem('petFinderToken')) {
        localStorage.removeItem('petFinderToken');
        await this.getToken();
        const res: any = await lastValueFrom(
          this.http2.get(
            `https://api.petfinder.com/v2/animals/?type=${type}&location=${zipcode}&sort=distance`,
            {
              headers: this.headers,
            }
          )
        );
        return res;
      }
    }
  }

  async getAnimal(id: string) {
    this.getToken();
    try {
      const res = await this.http.get(`/animals/${id}`);
      return res.data.animal;
    } catch (e) {
      localStorage.removeItem('petFinderToken');
      await this.getToken();
      const res = await this.http.get(`/animals/${id}`);
      return res.data.animal;
    }
  }
  async getToken() {
    const savedToken = localStorage.getItem('petFinderToken') || '';
    if (savedToken && savedToken !== 'undefined' && savedToken !== '') {
      this.token = savedToken;
      this.headers = new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.token}`
      );
    } else {
      const res = await lastValueFrom(
        this.http2.post<any>('https://api.petfinder.com/v2/oauth2/token', {
          client_id: environment.apiKey,
          client_secret: environment.apiSecret,
          grant_type: 'client_credentials',
        })
      );
      this.token = res.access_token;
      localStorage.setItem('petFinderToken', this.token);
      this.headers = new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.token}`
      );
    }
  }
}
