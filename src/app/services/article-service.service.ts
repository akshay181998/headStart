import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Article } from '../models/Article';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticleServiceService {

  articleCollection: AngularFirestoreCollection<Article>;
  articleDoc: AngularFirestoreDocument<Article>;
  ars: Observable<Article[]>;
  article: Observable<Article>;

  constructor(private afs: AngularFirestore) {
    this.articleCollection = this.afs.collection('article', ref => ref.orderBy('title', 'asc'));
  }

  getArticles(): Observable<Article[]> {
    this.ars = this.articleCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as Article;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
    return this.ars;
 }


 getArticle(id: string): Observable<Article> {
   this.articleDoc  = this.afs.doc<Article>(`article/${id}`);
   this.article = this.articleDoc.snapshotChanges().pipe(map(action => {
    if (action.payload.exists === false) {
      return null;
    } else {
      const data = action.payload.data() as Article;
      data.id = action.payload.id;
      // console.log()
      return data;
    }
   }
   ));
  //  console.log(this.article);
   return this.article;
 }




 newArticle(article: Article) {
   this.articleCollection.add(article);
 }
}
