import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PostService } from '../service/post.service';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.scss'],
})
export class UpdatePostComponent {
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: PostService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  post = {
    id: '',
    title: '',
    content: '',
    mainImageUrl: '',
    videoUrl: '',
    category: {
      id: '',
      title: '',
    },
  };
  categories: any = [];

  ngOnInit() {
    const id = this.router.url.split('/')[2];
    if (id) {
          this.categoryService.GetAllCategories().subscribe((res: any) => {
            this.categories = res;
          });
      this.service.GetPostById(id).subscribe((res: any) => {
        this.post = res;
        this.postform.patchValue({
          title: this.post.title,
          content: this.post.content,
          mainImageUrl: this.post.mainImageUrl,
          videoUrl: this.post.videoUrl,
          categoryId: this.post.category!.id,
        });
      });
    } else {
      this.router.navigate(['/post']);
    }
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

  updatePost() {
    if (this.postform.valid) {
      this.service
        .UpdatePost(this.post.id, this.postform.value)
        .subscribe((res: any) => {
          if (res) {
            this.toastr.success('Se ha actualizado la publicación');
            this.router.navigate(['/post']);
          } else {
            this.toastr.error('No se ha podido actualizar la publicación');
          }
        });
    } else {
      this.toastr.error('Por favor, revise los campos');
    }
  }
}
