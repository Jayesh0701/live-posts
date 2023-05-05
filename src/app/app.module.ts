import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostComponent } from './post/post.component';
import { AuthComponent } from './auth/auth.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
const routes: Routes =[
  {
    path:'',
    //component:PostListComponent,//instead using this we can use one another functionality. RedirectTo
    redirectTo:'/post-list',
    pathMatch:'full'
  },
  {
    path:'post-list',
    component:PostListComponent,
  },
  {
    path:'auth',
    component:AuthComponent,
  },
  {
    path:'post-add',
    component:PostEditComponent,
  },
  {
    path:'post-edit/:index',
    component:PostEditComponent,
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostListComponent,
    PostComponent,
    AuthComponent,
    PostEditComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent,HeaderComponent]
})
export class AppModule { }
