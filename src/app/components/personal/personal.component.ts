import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Profile } from '../../models/Profile';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { FormGroup, FormControl , FormsModule} from '@angular/forms';
import { AngularFireDatabaseModule } from 'angularfire2/database';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  email: string;
  id: string;
  firstName: string;
  lastName: string;
  dob: number;
  college: string;
  batch: string;
  branch: string;

  @ViewChild('profileForm') form: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private profileService: ProfileService,
    private afdb: AngularFireDatabaseModule
  ) { }

  ngOnInit() {
    // console.log(this.router.url);
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        console.log(auth.email);
        this.email = auth.email;
        this.id = auth.uid;
        // console.log(this.profile);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  onSubmit ({value , valid}: {value: Profile , valid: boolean}) {
    console.log('clicked');
    // console.log(this.profile);
    console.log(value);
    value.email = this.email;
    value.id = this.id;
    console.log(value.dob);
    this.profileService.newProfile(value, this.id);
  }

}
