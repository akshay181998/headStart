import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionService } from '../../services/question.service';
import { Question } from '../../models/Question';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {

  question: Question[] = [];
  constructor(private  questionService: QuestionService) {}
 
  ngOnInit() {
    this.questionService.getQuestion().subscribe(que => {
      // console.log(question);
      this.question = que;
      console.log(this.question);
    });
  }

}
