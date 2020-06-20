import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Profile } from '../../models/Profile';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;
  pro: Profile = {
    id: '',
    firstName: '',
    lastName: '',
    img: '',
    dob: null,
    college: '',
    batch: '',
    email: '',
    branch: '',
    articleId: [],
    qna: []
  };
  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private profileService: ProfileService
  ) {
    // this.profile.img = '';
    // this.profile.email = '';
    // this.profile.firstName = '';
    // this.profile.lastName = '';
    // this.profile.dob = null;
    // this.profile.college = '';
    // this.profile.batch = '';
    // this.profile.branch = '';
    // this.profile.articleId = [];
    // this.profile.qna = [];
    console.log(this.pro);
    console.log('this is working');
  }

  ngOnInit() {
  }

  onSubmit() {
    // console.log(this.email , this.password);
    // console.log('clicked');
    this.authService.register(this.email , this.password).then(res => {
      this.flashMessage.show('registration successfully' , { cssClass: 'notification is-success', timeout: 10000});
      console.log(res['user'].uid);
      // console.log(this.profile);
      this.pro.id = res['user'].uid;
      this.pro.email = this.email;
      setTimeout(() => {
        // console.log(this.profile);
        this.profileService.newProfile(this.pro , this.pro.id);
        // console.log(this.pro);
        this.router.navigate(['/profile/personal']);
      }, 1000);
    })
    .catch(err => {
      this.flashMessage.show(err.message , { cssClass: 'notification is-danger', timeout: 5000});
    });
  }

  clk() {
    this.authService.registerWithGoogle();
    this.authService.getAuth().subscribe(auth => {
      console.log(auth);
      this.pro.id = auth.uid;
      this.pro.email = auth.email;
      this.pro.img = auth.photoURL;
      this.pro.firstName = auth.displayName;
      this.profileService.newProfile(this.pro , this.pro.id);
      this.router.navigate(['/profile/personal']);
    });
  }
}
