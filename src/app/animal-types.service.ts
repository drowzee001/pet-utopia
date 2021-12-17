import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';
import axios, { AxiosInstance } from 'axios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnimalTypesService {
  public http: AxiosInstance;
  private token: string;
  public types: [];

  constructor() {
    this.http = axios.create({
      baseURL: 'https://api.petfinder.com/v2',
    });
  }

  async getAnimalTypes() {
    const res = await this.http.post('/oauth2/token', {
      client_id: environment.apiKey,
      client_secret: environment.apiSecret,
      grant_type: 'client_credentials',
    });

    this.token = res.data.access_token;
    this.http.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${res.data.access_token}`;

    const res2 = await this.http.get('/types');
    this.types = res2.data.types;
    return this.types;
  }

  async getAnimals(zipcode: string, type: string) {
    const res = await this.http.post('/oauth2/token', {
      client_id: environment.apiKey,
      client_secret: environment.apiSecret,
      grant_type: 'client_credentials',
    });

    this.token = res.data.access_token;
    this.http.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${res.data.access_token}`;

    const res2 = await this.http.get(
      `/animals/?type=${type}&location=${zipcode}&sort=distance`
    );
    return res2.data;
  }

  async getAnimal(id: string) {
    const res = await this.http.post('/oauth2/token', {
      client_id: environment.apiKey,
      client_secret: environment.apiSecret,
      grant_type: 'client_credentials',
    });

    this.token = res.data.access_token;
    this.http.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${res.data.access_token}`;

    const res2 = await this.http.get(`/animals/${id}`);
    return res2.data.animal;
  }
}
