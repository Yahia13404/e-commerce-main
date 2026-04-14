import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailsService } from './services/product-details.service';
import { Product } from '../../core/models/product.interface';
import { CartService } from '../cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productDetailsService = inject(ProductDetailsService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  id: string | null = null;
  productDetails: Product = {} as Product;
  ngOnInit(): void {
    this.getProductid();
    this.getProductDetailsdata();
  }
  getProductid(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (urlParams) => {
        this.id = urlParams.get('id');
      },
    });
  }
  getProductDetailsdata(): void {
    this.productDetailsService.getProductdetails(this.id).subscribe({
      next: (res) => {
        this.productDetails = res.data;
      },
      error: (err) => {},
    });
  }
  addProductItemtocart(id: string): void {
    this.cartService.addProducttocart(id).subscribe({
      next: (res) => {
        this.toastrService.success(res.message, 'FreshCartks');
      },
      error: (err) => {},
    });
  }
}
