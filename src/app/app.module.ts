import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuillModule } from 'ngx-quill';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { DownloadsComponent } from './components/downloads/downloads.component';
import { WriteComponent } from './components/write/write.component';
import { RegistersComponent } from './components/registers/registers.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FooterComponent } from './components/footer/footer.component';
import { AritcleComponent } from './components/aritcle/aritcle.component';
import { WritearticleComponent } from './writearticle/writearticle.component';
import { WriteblogComponent } from './writeblog/writeblog.component';
import { AuthService } from '../app/services/auth.service';
import { ProfileService } from '../app/services/profile.service';
import { ArticleServiceService } from '../app/services/article-service.service';
import { PersonalComponent } from './components/personal/personal.component';
import { QnaComponent } from './components/profile/qna/qna.component';
import { IndiArticleComponent } from './components/profile/indi-article/indi-article.component';
import { IndiBlogComponent } from './components/indi-blog/indi-blog.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutusComponent,
    HomepageComponent,
    NavbarComponent,
    ProfileComponent,
    BlogsComponent,
    ArticlesComponent,
    DownloadsComponent,
    WriteComponent,
    RegistersComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    AritcleComponent,
    WritearticleComponent,
    WriteblogComponent,
    PersonalComponent,
    QnaComponent,
    IndiArticleComponent,
    IndiBlogComponent,
  ],
  imports: [
    FormsModule,
    FlashMessagesModule.forRoot(),
    AngularFireStorageModule,
    ReactiveFormsModule,
    QuillModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'hStart'),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule
  ],
  providers: [
    ArticleServiceService,
    AuthService,
    ProfileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
