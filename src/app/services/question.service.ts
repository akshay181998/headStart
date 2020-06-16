import { Injectable } from '@angular/core';
import { AngularFirestore , AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Question } from '../models/Question';
import { map } from 'rxjs/operators';
import { AngularFireDatabaseModule } from 'angularfire2/database';
@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  questionCollection: AngularFirestoreCollection<Question>;
  questionDoc: AngularFirestoreDocument<Question>;
  questions: Observable<Question[]>;
  question: Observable<Question>;
  constructor (
    private afs: AngularFirestore,
    private afdb: AngularFireDatabaseModule
  ) {
    this.questionCollection = this.afs.collection('question');
   }

   getQuestion(): Observable<Question[]> {
    this.questions = this.questionCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as Question;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
    return this.questions;
 }


 getQue(id: string): Observable<Question> {
  this.questionDoc  = this.afs.doc<Question>(`question/${id}`);
  this.question = this.questionDoc.snapshotChanges().pipe(map(action => {
   if (action.payload.exists === false) {
     return null;
   } else {
     const data = action.payload.data() as Question;
     data.id = action.payload.id;
     // console.log()
     return data;
   }
  }
  ));
 //  console.log(this.article);
  return this.question;
}



  newQuestion(question: Question): any {
    return this.questionCollection.add(question);
  }


  updateQuestion(question: Question , id: string) {
    // this.clientDoc = this.afs.doc(`client/${client.id}`);
    // this.clientDoc.update(client);
    this.questionDoc = this.afs.doc(`question/${id}`);
    this.questionDoc.update(question);
   }
}
