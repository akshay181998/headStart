import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl , FormsModule} from '@angular/forms';
import { Article } from '../models/Article';
import { ArticleServiceService } from '../services/article-service.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-writearticle',
  templateUrl: './writearticle.component.html',
  styleUrls: ['./writearticle.component.css']
})
export class WritearticleComponent implements OnInit {
  article: Article = {
    handle: '',
    title: '',
    article: '',
    img: ''
  };
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  url = '';
  chg = false;
  uploadPer: number;
  file: string;
  filePath: string;
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

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
  ]
};

  @ViewChild('articleForm') form: any;
  constructor(
    private articleService: ArticleServiceService,
    private storage: AngularFireStorage,
    private router: Router,
    private flashMessage: FlashMessagesService

  ) {
  }

  ngOnInit() {
  }

  onSubmit({ value , valid }: { value: Article , valid: boolean }) {
    // console.log(this.editorForm.get('editor').value);
    // this.article.handle = 'akshay1909';
    value.handle = 'alkl';

    // get notified when the download URL is available
    this.task.snapshotChanges().pipe(
        finalize (() => this.downloadURL = this.fileRef.getDownloadURL() )
     )
    .subscribe();
    this.fileRef.getDownloadURL().subscribe(url => this.url = url);
    // console.log(this.url);
    setTimeout(() => {
      value.img = this.url;
      console.log(value.img);
      this.articleService.newArticle(value);
      this.router.navigate(['/article']);
    }, 1000);
    console.log(value);
    this.flashMessage.show('You are logged in now' , {
      cssClass: 'notification is-success', timeout: 2000
    });
  }
  uploadFile(event) {
    this.chg = true;
    this.file = event.target.files[0];
    this.filePath = '/img/' + this.file.name ;
    this.fileRef = this.storage.ref(this.filePath);
    this.task = this.storage.upload(this.filePath, this.file);
    // observe percentage changes
    this.uploadPercent = this.task.percentageChanges();
    this.task.percentageChanges().subscribe(change => this.change = change);
  }
}
