import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from '../app/components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { AritcleComponent } from './components/aritcle/aritcle.component';
import { WritearticleComponent } from './writearticle/writearticle.component';
import { DownloadsComponent } from './components/downloads/downloads.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PersonalComponent } from './components/personal/personal.component';
import { QnaComponent } from '../app/components/profile/qna/qna.component';
import { IndiArticleComponent } from '../app/components/profile/indi-article/indi-article.component';
import { WriteComponent } from './components/write/write.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'article', component: ArticlesComponent },
  { path: 'article/:id', component: AritcleComponent},
  { path: 'blogs', component: BlogsComponent },
  { path: 'article/:id', component: AritcleComponent },
  { path: 'writearticle', component: WritearticleComponent },
  { path: 'download', component: DownloadsComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'writeqna', component: WriteComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      { path: 'personal', component: PersonalComponent},
      { path: 'qna', component: QnaComponent},
      { path: 'articles', component: IndiArticleComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
