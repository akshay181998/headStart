import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/Article';
import { ArticleServiceService } from '../../services/article-service.service';
import { of } from 'rxjs';
import { ProfileService } from '../../services/profile.service';
import { Profile } from 'src/app/models/Profile';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  articles: Article[];
  author: Profile;
  constructor(
    private articleService: ArticleServiceService,
     ) { }

  ngOnInit() {
    this.articleService.getArticles().subscribe( articles => {
      this.articles = articles;
    });
  }
}