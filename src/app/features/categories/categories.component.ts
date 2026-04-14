import { Subscription } from 'rxjs';
import { Category } from './../../core/models/category.interface';
import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from './services/categories.service';
import { Categories } from './interfaces/categories.interface';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);
  categoriesList: Category[] = [];
  ngOnInit(): void {
    this.getAllcategories();
  }

  getAllcategories(): void {
    this.categoriesService.getCategories().subscribe({
      next: (res) => {
        this.categoriesList = res.data;
      },
    });
  }
}
