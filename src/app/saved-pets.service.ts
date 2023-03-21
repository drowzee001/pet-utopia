import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, switchMap } from 'rxjs/operators';

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
  savedPets$: Observable<savedPet[]>;
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
      );
    }
    return this.savedPets$;
  }
  savePet(id: string) {
    this.savedPetsCollection = this.afs.collection<savedPet>('savedPets');
    this.savedPetsCollection.add({ uid: this.auth.user.id, animal_id: id });
  }
  deletePet(id: string) {
    console.log();
    this.afs.doc(`savedPets/${id}`).delete();
  }
}
