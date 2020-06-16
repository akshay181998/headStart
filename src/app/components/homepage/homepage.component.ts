import { Component, OnInit } from '@angular/core';
import { ArticleServiceService } from '../../services/article-service.service';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(
    private articleService: ArticleServiceService,
    private questionService: QuestionService
  ) { }

  ngOnInit() {
    this.articleService.getArticles().subscribe(article => {
      console.log(article);
    });
    this.questionService.getQuestion().subscribe(question => {
      console.log(question);
    })
  }

}
