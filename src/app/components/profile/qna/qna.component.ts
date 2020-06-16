import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ProfileService } from '../../../services/profile.service';
import { QuestionService } from '../../../services/question.service';
import { Profile } from '../../../models/Profile';
import { Question } from '../../../models/Question';
import { getLocaleEraNames } from '@angular/common';

@Component({
  selector: 'app-qna',
  templateUrl: './qna.component.html',
  styleUrls: ['./qna.component.css']
})
export class QnaComponent implements OnInit {

  questions: Question[] = [];
  question: Question = {
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    answers: [],
    upvote: 0
  };
  profile: Profile;

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private questionService: QuestionService
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      this.profileService.getProfile(auth.uid).subscribe(pro => {
        this.profile = pro;
        let i;
        // console.log(this.articles);
        for ( i = 0 ; i < this.profile.articleId.length ; i++) {
          // console.log(this.profile.articleId[i]);
          this.questionService.getQue(this.profile.qna[i]).subscribe(que => {
            this.question = que;
            console.log(this.question);
            this.questions.push(this.question);
          });
        }
        // console.log(this.questions);
      });
    });
  }

}
