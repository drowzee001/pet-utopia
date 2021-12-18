import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface savedPet {
  doc_id: string;
  uid: string;
  animal_id: string;
}

@Injectable({
  providedIn: 'root',
})
export class SavedPetsService {
  private savedPetsCollection: AngularFirestoreCollection<any>;
  savedPets: Observable<savedPet[]>;
  constructor(private afs: AngularFirestore, private auth: AuthService) {
    if (auth.user.id) {
      this.savedPetsCollection = afs.collection<savedPet>('savedPets', (ref) =>
        ref.where('uid', '==', auth.user.id)
      );
      this.savedPets = this.savedPetsCollection.valueChanges({
        idField: 'doc_id',
      });
    }
  }
  savePet(id: string) {
    this.savedPetsCollection.add({ uid: this.auth.user.id, animal_id: id });
  }
  deletePet(id: string) {
    this.afs.doc(`savedPets/${id}`).delete();
  }
}
