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
<<<<<<< Updated upstream
  savedPets: Observable<savedPet[]>;
  constructor(private afs: AngularFirestore, private auth: AuthService) {
    if (auth.user.id) {
      this.savedPetsCollection = afs.collection<savedPet>('savedPets', (ref) =>
        ref.where('uid', '==', auth.user.id)
=======
  savedPets$: Observable<savedPet[]>;
  savedPets: savedPet[] = [];
  uid$: BehaviorSubject<string | null>;

  constructor(private afs: AngularFirestore, private auth: AuthService) {}
  getSavedPets() {
    if (this.auth.user.id) {
      this.uid$ = new BehaviorSubject(this.auth.user.id);
      this.savedPets$ = combineLatest([this.uid$]).pipe(
        switchMap(([uid]) =>
          this.afs
            .collection<savedPet>('savedPets', (ref) =>
              ref.where('uid', '==', uid)
            )
            .snapshotChanges()
            .pipe(
              map((actions) =>
                actions.map((data) => {
                  const doc = data.payload.doc.data();
                  return {
                    doc_id: data.payload.doc.id,
                    uid: doc.uid,
                    animal_id: doc.animal_id,
                  };
                })
              )
            )
        )
>>>>>>> Stashed changes
      );
      this.savedPets = this.savedPetsCollection.valueChanges({
        idField: 'doc_id',
      });
    }
<<<<<<< Updated upstream
=======
    return this.savedPets$;
>>>>>>> Stashed changes
  }
  savePet(id: string) {
    this.savedPetsCollection.add({ uid: this.auth.user.id, animal_id: id });
  }
  deletePet(id: string) {
    this.afs.doc(`savedPets/${id}`).delete();
  }
}
