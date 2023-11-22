import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserlistingComponent } from './userlisting/userlisting.component';
import { AuthGuard } from './guard/auth.guard';
import { CategoryComponent } from './category/category.component';
import { PostComponent } from './post/post.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { UpdatePostComponent } from './update-post/update-post.component';
import { QuestionComponent } from './question/question.component';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { UpdateQuestionComponent } from './update-question/update-question.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'user',
    component: UserlistingComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'category',
    component: CategoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'post',
    component: PostComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create-category',
    component: CreateCategoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-category/:id',
    component: UpdateCategoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create-post',
    component: CreatePostComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-post/:id',
    component: UpdatePostComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'question/:id',
    component: QuestionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create-question/:id',
    component: CreateQuestionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-question/:id',
    component: UpdateQuestionComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
