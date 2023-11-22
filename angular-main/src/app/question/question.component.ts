import { Component } from '@angular/core';
import { QuestionService } from '../service/question.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent {
  constructor(
    private service: QuestionService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.LoadQuestions();
  }

  questions: any = [];
  id = '0';
  displayedColumns = [
    'id',
    'question',
    'answer',
    'postId',
    'actions',
  ];
  dataSource: any;

  LoadQuestions() {
    this.id = this.router.url.split('/')[2];
    this.service.GetQuestionsByPostId(this.id).subscribe((res: any) => {
      this.questions = res;
      this.dataSource = new MatTableDataSource(this.questions);
    });
  }

  deleteQuestion(id: any) {
    this.service.DeleteQuestion(id).subscribe((res: any) => {
      if (res) {
        this.LoadQuestions();
        this.toastr.success('Se ha eliminado la pregunta');
      }
    });
  }
}
