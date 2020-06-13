import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../models/Profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  file: string;
  filePath: string;
  fileRef: any;
  task: any;
  id: string;
  change: number;
  url: string;
  imgUrl: string;
  pro: Profile;

  constructor(
    private router: Router,
    private storage: AngularFireStorage,
    private authService: AuthService,
    private profileService: ProfileService
    ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.id = auth.uid;
        console.log(auth.email);
        this.profileService.getProfile(auth.uid).subscribe(profile => {
          this.imgUrl = profile.img;
          this.pro = profile;
        });
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  uploadFile(e) {
    this.file = e.target.files[0];
    this.filePath = '/profilePic/' + this.id;
    this.fileRef = this.storage.ref(this.filePath);
    this.task = this.storage.upload(this.filePath, this.file);
    this.uploadPercent = this.task.percentageChanges();
    this.task.percentageChanges().subscribe(change => this.change = change);
    this.task.snapshotChanges().pipe(
      finalize (() => this.downloadURL = this.fileRef.getDownloadURL())
    ).subscribe();
    this.fileRef.getDownloadURL().subscribe(url => {
      this.url = url;
      this.pro.img = this.url;
      console.log(this.pro);
      this.profileService.updateProfile(this.pro , this.pro.id);
      console.log(url);
    });
    // console.log(this.url);

  }
}
