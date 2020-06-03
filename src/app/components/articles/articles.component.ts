import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/Article';
import { ArticleServiceService } from '../../services/article-service.service';
import { of } from 'rxjs';


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  articles: Article[];
  constructor(
    private articleService: ArticleServiceService
     ) { }

  ngOnInit() {
    this.articleService.getArticles().subscribe( articles => {
      // console.log(articles);
      this.articles = articles;
      // for ( const ar of this.articles) {
      //   if ( ar.img === '') {
      //     ar.img = '../../assets/p.jpeg';
      //   }
      //   console.log(ar.img);
      // }
    });
  }


}