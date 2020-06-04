import { Injectable } from '@angular/core';
import { AngularFirestore , AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Profile } from '../models/Profile';
import { map } from 'rxjs/operators';
import { AngularFireDatabaseModule } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  id: string;

  profileCollection: AngularFirestoreCollection<Profile>;
  profileDoc: AngularFirestoreDocument<Profile>;
  profiles: Observable<Profile[]>;
  profile: Observable<Profile>;

  constructor(
    private afs: AngularFirestore,
    private afdb: AngularFireDatabaseModule
    ) {
    this.profileCollection = this.afs.collection('profile');
   }

   newProfile(profile: Profile, id: string) {
    //  this.afs.collection(`profile/${id}`).add(profile);
    this.profileCollection.doc(id).set(profile);
   }

   getProfile(id: string): Observable<Profile> {
    this.profileDoc  = this.afs.doc<Profile>(`profile/${id}`);
    this.profile = this.profileDoc.snapshotChanges().pipe(map(action => {
     if (action.payload.exists === false) {
       return null;
     } else {
       const data = action.payload.data() as Profile;
       data.id = action.payload.id;
       // console.log()
       return data;
     }
    }
    ));
   //  console.log(this.article);
    return this.profile;
  }
 
}
