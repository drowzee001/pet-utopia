import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimalComponent } from './animal/animal.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SavedPetsComponent } from './saved-pets/saved-pets.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'search', component: SearchComponent }, 
  { path: 'pets/:id', component: AnimalComponent },
  {
    path: 'savedPets',
    component: SavedPetsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
