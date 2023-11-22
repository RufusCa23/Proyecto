import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../service/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss'],
})
export class UpdateCategoryComponent {
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: CategoryService,
    private router: Router
  ) {}

  category = {
    id: '',
    title: '',
    description: '',
  }

  ngOnInit() {
    const id = this.router.url.split('/')[2];
    if (id) {
      this.service.GetCategoryById(id).subscribe((res: any) => {
        this.category = res;
        this.categoryform.patchValue({
          title: this.category.title,
          description: this.category.description,
        });
      });
    } else {
      this.router.navigate(['/category']);
    }
  }

  categoryform = this.builder.group({
    title: this.builder.control('', Validators.compose([Validators.required])),
    description: this.builder.control(
      '',
      Validators.compose([Validators.required])
    ),
  });

  updateCategory() {
    if (this.categoryform.valid) {
      this.service
        .UpdateCategory(this.category.id, this.categoryform.value)
        .subscribe((res: any) => {
          if (res) {
            this.toastr.success('Se ha actualizado la categoría');
            this.router.navigate(['/category']);
          } else {
            this.toastr.error('No se ha podido actualizar la categoría');
          }
        });
    } else {
      this.toastr.error('Por favor, revise los campos');
    }
  }
}
