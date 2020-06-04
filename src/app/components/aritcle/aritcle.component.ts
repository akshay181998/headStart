import { Component, OnInit } from '@angular/core';
import {  Article } from '../../models/Article';
import { ArticleServiceService } from '../../services/article-service.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ProfileService } from '../../services/profile.service';
import { Profile } from 'src/app/models/Profile';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-aritcle',
  templateUrl: './aritcle.component.html',
  styleUrls: ['./aritcle.component.css']
})
export class AritcleComponent implements OnInit {

  id: string;
  art: string;
  article: Article;
  title: string;
  img: string;
  handle: string;
  author: Profile;

  constructor(
    private articleService: ArticleServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessages: FlashMessagesService,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.id  = this.route.snapshot.params['id'];
    // console.log(this.id);
    this.articleService.getArticle(this.id).subscribe(article => {
      this.article = article;
      // console.log(this.article);
      this.profileService.getProfile(this.article.uid).subscribe(pro => {
        console.log(pro);
        this.author = pro;
      });
    });
  }

}
