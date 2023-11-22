import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../service/category.service';
import { Router } from '@angular/router';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss'],
})
export class CreateQuestionComponent {
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: QuestionService,
    private router: Router
  ) {}

  id: any;

  ngOnInit(): void {
    this.id = this.router.url.split('/')[2];
    this.questionform.controls['postId'].setValue(parseInt(this.id));
    this.questionform.controls['isOptional'].setValue(false);
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

  createQuestion() {
    if (this.questionform.valid) {
      console.log(this.questionform.value);
      this.service
        .CreateQuestion(this.questionform.value)
        .subscribe((res: any) => {
          if (res) {
            this.toastr.success('Se ha creado la pregunta');
            this.router.navigate(['/question/' + this.id]);
          } else {
            this.toastr.error('No se ha podido registrar');
          }
        });
    } else {
      this.toastr.error('Por favor, revise los campos');
    }
  }
}
