import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl , FormsModule} from '@angular/forms';
import { Article } from '../../models/Article';
import { ArticleServiceService } from '../../services/article-service.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../../app/services/profile.service';
import { Profile } from '../../models/Profile';
import { Question } from '../../models/Question';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit {

  // article: Article = {
  //   uid: '',
  //   date: 0,
  //   title: '',
  //   content: '',
  //   img: ''
  // };
  question: Question = {
    id: '',
    date: 0,
    title: '',
    category: '',
    description: '',
    authId: '',
    answers: []
  }
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  url = '';
  chg = false;
  uploadPer: number;
  file: string;
  author: Profile;
  filePath: string;
  pfId: string;
  fileRef: any;
  task: any;
  change: number;
  editorOptions = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': ['green'] }, { 'background': ['white', 'green'] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
  ],
};

  @ViewChild('articleForm') form: any;
  constructor(
    private articleService: ArticleServiceService,
    private storage: AngularFireStorage,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private profileService: ProfileService,
    private questionService: QuestionService
  ) {
  }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if ( auth ) {
        this.pfId = auth.uid;
        this.profileService.getProfile(this.pfId).subscribe(pro => {
          this.author = pro;
        });
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  onSubmit({ value , valid }: { value: Question , valid: boolean }) {
    value.id = this.author.id;
    value.date = new Date().toDateString();
    value.answers = this.question.answers;
    console.log(value);
    // setTimeout(() => {
      this.questionService.newQuestion(value).then((e) => {
        console.log(e);
        this.author.qna.push(e.id);
        this.profileService.updateProfile(this.author , this.author.id);
      });
      this.router.navigate(['/blogs']);
    // }, 1000);
    this.flashMessage.show('You are logged in now' , {
      cssClass: 'notification is-success', timeout: 2000
    });
  }
}
