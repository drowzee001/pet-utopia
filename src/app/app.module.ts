import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { AnimalComponent } from './animal/animal.component';
import { LoginComponent } from './login/login.component';
import { SavedPetsComponent } from './saved-pets/saved-pets.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment'; 

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    AnimalComponent,
    LoginComponent,
    SavedPetsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
