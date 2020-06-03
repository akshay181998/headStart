import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean;
  loggedInUser: string;

  constructor(
    private authService: AuthService,
    private fsm: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      // console.log(auth.uid);
      if (auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  onClickLogOut() {
    this.authService.logOut();
    this.fsm.show('You are logout succesfully', { cssClass: 'notification is-success', timeout: 1000});
    this.router.navigate(['/']);
    this.isLoggedIn = false;
    this.loggedInUser = '';
  }
}
