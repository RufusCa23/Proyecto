import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss'],
})
export class CreateCategoryComponent {
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: CategoryService,
    private router: Router
  ) {}

  categoryform = this.builder.group({
    title: this.builder.control(
      '',
      Validators.compose([Validators.required])
    ),
    description: this.builder.control(
      '',
      Validators.compose([Validators.required])
    ),
  });

  createCategory() {
    if (this.categoryform.valid) {
      this.service.CreateCategory(this.categoryform.value).subscribe((res: any) => {
        if (res) {
          this.toastr.success('Se ha creado la categoría');
          this.router.navigate(['/category']);
        } else {
          this.toastr.error('No se ha podido registrar');
        }
      });
    } else {
      this.toastr.error('Por favor, revise los campos');
    }
  }
}
