import { Result } from './../../../../node_modules/hono/dist/types/router.d';
import { Data } from './../../../../node_modules/hono/dist/types/context.d';
import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../core/models/product.interface';
import { ProductsService } from '../../core/services/products/products.service';
import { CardComponent } from '../../shared/components/card/card.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../shared/pipes/search-pipe';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-products',
  imports: [CardComponent, NgxPaginationModule, FormsModule, SearchPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly ngxSpinnerService = inject(NgxSpinnerService);
  productsList: Product[] = [];
  pageSize!: number;
  p!: number;
  total!: number;
  text: string = '';
  ngOnInit(): void {
    this.getAllProductsdata();
  }
  getAllProductsdata(PageNumber: number = 1): void {
    this.ngxSpinnerService.show();

    this.productsService.getAllproducts(PageNumber).subscribe({
      next: (res) => {
        this.productsList = res.data;
        this.pageSize = res.metadata.limit;
        this.p = res.metadata.currentPage;
        this.total = res.results;
        this.ngxSpinnerService.hide();
      },

      error: (err) => {
        this.ngxSpinnerService.hide();
      },
    });
  }
}
