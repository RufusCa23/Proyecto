import { Component } from '@angular/core';
import { PostService } from '../service/post.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent {
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: PostService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  categories: any = [];

  ngOnInit(): void {
    this.categoryService.GetAllCategories().subscribe((res: any) => {
      this.categories = res;
    });
  }
  postform = this.builder.group({
    title: this.builder.control('', Validators.compose([Validators.required])),
    content: this.builder.control(
      '',
      Validators.compose([Validators.required])
    ),
    mainImageUrl: this.builder.control(
      '',
      Validators.compose([Validators.required])
    ),
    videoUrl: this.builder.control(
      '',
      Validators.compose([Validators.required])
    ),
    categoryId: this.builder.control(
      '',
      Validators.compose([Validators.required])
    ),
  });

  createPost() {
    if (this.postform.valid) {
      this.service.CreatePost(this.postform.value).subscribe((res: any) => {
        console.log(res);
        if (res) {
          this.toastr.success('Se ha creado la publicación');
          this.router.navigate(['/post']);
        } else {
          this.toastr.error('No se ha podido registrar');
        }
      });
    } else {
      this.toastr.error('Por favor, revise los campos');
    }
  }
}
