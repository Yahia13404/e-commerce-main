import { Wishlist } from './../../../features/wishlist/interfaces/wishlist.interface';
import { Component, inject, Input, input, OnInit, PLATFORM_ID } from '@angular/core';
import { Product } from '../../../core/models/product.interface';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../../features/cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../features/wishlist/wishlist/services/wishlist.service';
import { WishlistComponent } from '../../../features/wishlist/wishlist/wishlist.component';
import { get } from 'http';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input({ required: true }) product: Product = {} as Product;
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly toastrService = inject(ToastrService);
  iswishlist: boolean = false;
  WishlistId: string[] = [];

  idsArray: string[] = [];
  addProductItemtocart(id: string): void {
    this.cartService.addProducttocart(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.cartService.countNumber.next(res.numOfCartItems);

          this.toastrService.success(res.message, 'FreshCartks');
        }
      },
    });
  }
  ngOnInit(): void {
    this.loadWishlistStatus();
  }

  // دالة لتحميل الداتا من الكاش أول ما الكومبوننت يفتح
  loadWishlistStatus(): void {
    if (isPlatformBrowser(this.platformId)) {
      const savedIds = localStorage.getItem('all_product_ids');
      if (savedIds) {
        this.idsArray = JSON.parse(savedIds);
        // نغير حالة القلب بناءً على وجود الـ id في الـ Array
        this.iswishlist = this.idsArray.includes(this.product._id);
      }
    }
  }

  toggleIcone(id: string): void {
    if (!this.idsArray.includes(id)) {
      this.addTowishlist(id);
    } else {
      this.removeitem(id);
    }
  }

  addTowishlist(id: string): void {
    this.wishlistService.addProductTowishlist(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.iswishlist = true;
          this.idsArray.push(id);
          this.updateLocalStorage();
          this.toastrService.success(res.message);
        }
      },
    });
  }

  removeitem(id: string): void {
    this.wishlistService.removeProductFromwishlist(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.iswishlist = false;

          this.idsArray = this.idsArray.filter((item) => item !== id);
          this.updateLocalStorage();
          this.toastrService.info(res.message);
        }
      },
    });
  }
  private updateLocalStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('all_product_ids', JSON.stringify(this.idsArray));
    }
  }
}
