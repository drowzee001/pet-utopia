import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface savedPet {
  uid: string;
  animal_id: string;
}

@Injectable({
  providedIn: 'root',
})
export class SavedPetsService {
  private savedPetsCollection: AngularFirestoreCollection<savedPet>;
  savedPets: Observable<savedPet[]>;
  constructor(private afs: AngularFirestore, private auth: AuthService) {
    this.savedPetsCollection = afs.collection<savedPet>('savedPets', (ref) =>
      ref.where('uid', '==', auth.user.id)
    );
    this.savedPets = this.savedPetsCollection.valueChanges();
  }
  savePet(id: string) {
    this.savedPetsCollection.add({ uid: this.auth.user.id, animal_id: id });
  }
  deletePet(id: string) {
    const document = this.afs.collection('savedPets', (ref) =>
      ref.where('uid', '==', this.auth.user.id).where('animal_id', '==', id)
    );
    document
      .valueChanges({ idField: 'doc_id' })
      .subscribe((res) => this.afs.doc(`savedPets/${res[0].doc_id}`).delete());
  }
}
