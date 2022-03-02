import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

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
      this.savedPets = this.savedPetsCollection.snapshotChanges().pipe(
        map((actions) =>
          actions.map((data) => {
            const doc = data.payload.doc.data();
            const doc_id = data.payload.doc.id;
            return { doc_id, ...doc };
          })
        )
      );
    }
    // this.savedPetsCollection = this.afs.collection<savedPet>('savedPets');
  }
  getSavedPets() {
    // if (this.auth.user.id) {
    //   this.savedPetsCollection = this.afs.collection<savedPet>(
    //     'savedPets',
    //     (ref) => ref.where('uid', '==', this.auth.user.id)
    //   );
    //   this.savedPets = this.savedPetsCollection.valueChanges({
    //     idField: 'doc_id',
    //   });
    // }
  }
  checkIfSaved(id: string) {
    // if (this.auth.user.id) {
    //   const savedPet = this.afs.collection<savedPet>('savedPets', (ref) =>
    //     ref.where('uid', '==', this.auth.user.id).where('animal_id', '==', id)
    //   );
    //   console.log(savedPet);
    //   if (savedPet) {
    //     return true;
    //   } else return false;
    // } else {
    //   return false;
    // }
  }
  savePet(id: string) {
    this.savedPetsCollection = this.afs.collection<savedPet>('savedPets');
    this.savedPetsCollection.add({ uid: this.auth.user.id, animal_id: id });
  }
  deletePet(id: string) {
    this.afs.doc(`savedPets/${id}`).delete();
  }
}
