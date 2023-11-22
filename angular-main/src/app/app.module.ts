import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserlistingComponent } from './userlisting/userlisting.component';
import { UpdatepopupComponent } from './updatepopup/updatepopup.component';
import { CategoryComponent } from './category/category.component';
import { PostComponent } from './post/post.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { UpdatePostComponent } from './update-post/update-post.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { UpdateQuestionComponent } from './update-question/update-question.component';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { QuestionComponent } from './question/question.component';

@NgModule({
  declarations: [AppComponent, RegisterComponent, LoginComponent, HomeComponent, UserlistingComponent, UpdatepopupComponent, CategoryComponent, PostComponent, CreateCategoryComponent, CreatePostComponent, UpdatePostComponent, UpdateCategoryComponent, UpdateQuestionComponent, CreateQuestionComponent, QuestionComponent],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
