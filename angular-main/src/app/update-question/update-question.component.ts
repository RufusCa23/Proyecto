import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { QuestionService } from '../service/question.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.scss'],
})
export class UpdateQuestionComponent {
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: QuestionService,
    private router: Router
  ) {}

  id: any;

  question = {
    id: '',
    question: '',
    answer: '',
    postId: 0,
    isOptional: false,
  };

  ngOnInit(): void {
    this.id = this.router.url.split('/')[2];
    this.service.GetQuestionById(this.id).subscribe((res: any) => {
      this.question = res[0];
      this.questionform.setValue({
        question: this.question.question,
        answer: this.question.answer,
        postId: this.question.postId,
        isOptional: this.question.isOptional,
      });
    });
  }

  questionform = this.builder.group({
    question: this.builder.control(
      '',
      Validators.compose([Validators.required])
    ),
    answer: this.builder.control('', Validators.compose([Validators.required])),
    postId: this.builder.control(0, Validators.compose([Validators.required])),
    isOptional: this.builder.control(false),
  });

  updateQuestion() {
    if (this.questionform.valid) {
      this.service
        .UpdateQuestion(this.id, this.questionform.value)
        .subscribe((res: any) => {
          if (res) {
            this.toastr.success('Se ha actualizado la pregunta');
            this.router.navigate([
              '/question/' + this.questionform.value.postId,
            ]);
          } else {
            this.toastr.error('No se ha podido actualizar la pregunta');
          }
        });
    } else {
      this.toastr.error('Por favor, revise los campos');
    }
  }
}
