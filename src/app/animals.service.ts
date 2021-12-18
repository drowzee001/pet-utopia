import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import axios, { AxiosInstance } from 'axios';

@Injectable({
  providedIn: 'root',
})
export class AnimalsService {
  public http: AxiosInstance;
  private token: string;
  public types: [];

  constructor() {
    this.http = axios.create({
      baseURL: 'https://api.petfinder.com/v2',
    });
  }

  async getAnimalTypes() {
    this.getToken();
    try {
      const res = await this.http.get('/types');
      this.types = res.data.types;
      return this.types;
    } catch (e) {
      localStorage.removeItem('petFinderToken');
      this.getToken();
      const res = await this.http.get('/types');
      this.types = res.data.types;
      return this.types;
    }
  }

  async getAnimals(zipcode: string, type: string) {
    this.getToken();
    try {
      const res = await this.http.get(
        `/animals/?type=${type}&location=${zipcode}&sort=distance`
      );
      return res.data;
    } catch (e) {
      localStorage.removeItem('petFinderToken');
      await this.getToken();
      const res = await this.http.get(
        `/animals/?type=${type}&location=${zipcode}&sort=distance`
      );
      return res.data;
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
    if (!localStorage.getItem('petFinderToken')) {
      const res = await this.http.post('/oauth2/token', {
        client_id: environment.apiKey,
        client_secret: environment.apiSecret,
        grant_type: 'client_credentials',
      });
      this.token = res.data.access_token;
      localStorage.setItem('petFinderToken', this.token);
    } else {
      this.token = localStorage.getItem('petFinderToken') || '';
    }
    this.http.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
  }
}
