import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ProfileService } from '../../../services/profile.service';
import { ArticleServiceService } from '../../../services/article-service.service';
import { Profile } from '../../../models/Profile';
import { Article } from '../../../models/Article'; 
import { getLocaleEraNames } from '@angular/common';

@Component({
  selector: 'app-indi-article',
  templateUrl: './indi-article.component.html',
  styleUrls: ['./indi-article.component.css']
})
export class IndiArticleComponent implements OnInit {

  articles: Article[] = [];
  article: Article = {
    id: '',
    name: '',
    uid: '',
    title: '',
    content: '',
    img: '',
    date: null
  };
  profile: Profile;

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private artService: ArticleServiceService
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      this.profileService.getProfile(auth.uid).subscribe(pro => {
        this.profile = pro;
        let i;
        // console.log(this.articles);
        for ( i = 0 ; i < this.profile.articleId.length ; i++) {
          // console.log(this.profile.articleId[i]);
          this.artService.getArticle(this.profile.articleId[i]).subscribe(art => {
            this.article = art;
            // console.log(this.article);
            this.articles.push(this.article);
          });
        }
        console.log(this.articles);
      });
    });
  }

}
