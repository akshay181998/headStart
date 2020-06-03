import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;
  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    // console.log(this.email , this.password);
    // console.log('clicked');
    this.authService.register(this.email , this.password).then(res => {
      this.flashMessage.show('registration successfully' , { cssClass: 'notification is-success', timeout: 10000});
      this.router.navigate(['/']);
    })
    .catch(err => {
      this.flashMessage.show(err.message , { cssClass: 'notification is-danger', timeout: 5000});
    });
  }
}
