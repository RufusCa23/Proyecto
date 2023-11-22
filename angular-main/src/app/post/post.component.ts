import { Component } from '@angular/core';
import { PostService } from '../service/post.service';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  constructor(private service: PostService, private toastr: ToastrService) {
    this.LoadPosts();
  }

  posts: any = [];
  displayedColumns = [
    'id',
    'title',
    'content',
    'slug',
    'mainImageUrl',
    'videoUrl',
    'category',
    'createdAt',
    'updatedAt',
    'actions'
  ];
  dataSource: any;

  LoadPosts() {
    this.service.GetAllPosts().subscribe((res: any) => {
      this.posts = res;
      this.dataSource = new MatTableDataSource(this.posts);
    });
  }

  deletePost(id: any) {
    this.service.DeletePost(id).subscribe((res: any) => {
      if (res) {
        this.LoadPosts();
        this.toastr.success('Se ha eliminado la categoría');
      }
    });
  }
}
