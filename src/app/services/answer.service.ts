import { Injectable } from '@angular/core';
import { AngularFirestore , AngularFirestoreCollection , AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Answer } from '../models/Answer';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  answerCollection: AngularFirestoreCollection<Answer>;
  answerDoc: AngularFirestoreDocument<Answer>;
  ans: Observable<Answer>;
  ansId: string;

  constructor(
    private afs: AngularFirestore
  ) {
    this.answerCollection = this.afs.collection('answer', ref => ref.orderBy('date', 'asc'));
  }

  getAnswer(id: string): Observable<Answer> {
    this.answerDoc  = this.afs.doc<Answer>(`answer/${id}`);
    this.ans = this.answerDoc.snapshotChanges().pipe(map(action => {
     if (action.payload.exists === false) {
       return null;
     } else {
       const data = action.payload.data() as Answer;
       data.id = action.payload.id;
       // console.log()
       return data;
     }
    }
    ));
   //  console.log(this.article);
    return this.ans;
  }

  newAnswer(answer: Answer): any {
    return this.answerCollection.add(answer);
  }

}
