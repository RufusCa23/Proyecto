import { Component } from '@angular/core';
import { CategoryService } from '../service/category.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {
  constructor(private service: CategoryService, private router: Router, private toastr: ToastrService) {
    this.LoadCategories();
  }

  categories: any = [];
  displayedColumns = [
    'id',
    'title',
    'description',
    'createdAt',
    'updatedAt',
    'actions',
  ];
  dataSource: any;

  LoadCategories() {
    this.service.GetAllCategories().subscribe((res: any) => {
      this.categories = res;
      this.dataSource = new MatTableDataSource(this.categories);
    });
  }
  
  deleteCategory(id: any) {
    this.service.DeleteCategory(id).subscribe((res: any) => {
      if (res) {
        this.LoadCategories();
        this.toastr.success('Se ha eliminado la categoría');
      }
    });
  }
}
