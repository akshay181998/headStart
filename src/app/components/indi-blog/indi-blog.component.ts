import { Component, OnInit } from '@angular/core';
import { Question } from '../../models/Question';
import { QuestionService } from '../../services/question.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Answer } from '../../models/Answer';
import { AnswerService } from '../../services/answer.service';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-indi-blog',
  templateUrl: './indi-blog.component.html',
  styleUrls: ['./indi-blog.component.css']
})
export class IndiBlogComponent implements OnInit {
  ansSection: string;
  answer: Answer = {
    qid: '',
    ans: '',
    date: '',
    authName: '',
    upvotes: 0
  };
  answers: Answer[] = [];
  question: Question = {
    id: '',
    title: '',
    category: '',
    description: '',
    authId: '',
    date: '',
    answers: [],
    upvote: 0
  };
  constructor(
    private questionService: QuestionService,
    private router: Router,
    private route: ActivatedRoute,
    private answerService: AnswerService,
    private authService: AuthService,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.question.id = this.route.snapshot.params['id'];
    this.questionService.getQue(this.question.id).subscribe(question => {
      this.question = question;
      let i: number;
      this.answers = [];
      for (i = 0 ; i < this.question.answers.length ; i++) {
        this.answerService.getAnswer(this.question.answers[i]).subscribe(ans => {
          this.answer = ans;
          // console.log(this.answer);
          this.answers.push(ans);
        });
      }
      // console.log(this.question);
    });
  }

  onSubmit({value , valid}: {value: Answer , valid: boolean}) {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.answer.qid = this.question.id;
        this.answer.date = new Date().toDateString();
        value.qid = this.answer.qid;
        value.date = this.answer.date;
        value.upvotes = 0;
        this.profileService.getProfile(auth.uid).subscribe(pro => {
          this.answer.authName = pro.firstName + ' ' + pro.lastName;
          value.authName = this.answer.authName;
          console.log(value);
          if (value['ansSection'] !== undefined) {
            console.log(value);
            this.answerService.newAnswer(value).then( (e) => {
              this.question.answers.push(e.id);
              this.questionService.updateQuestion(this.question , this.question.id);
              console.log(e);
              // console.log(this.question.id);
              // console.log(this.question);
            });
            this.ansSection = '';
          }
        });
      } else {
        this.router.navigate(['/login']);
      }
    });
    // console.log(this.answer);
  }

}
