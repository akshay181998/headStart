import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private flashMessages: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(['/']);
      }
    });
  }


  onSubmit () {
    this.authService.login(this.email , this.password).then( res => {
      this.flashMessages.show('you are logged in',{  cssClass: 'notification is-success', timeout: 1000});
      this.router.navigate(['/']);
    })
    .catch( err => {
      this.flashMessages.show(err.message , { cssClass: 'notification is-danger', timout: 1000});
    });
  }
}
