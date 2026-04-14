import { ToastrService } from 'ngx-toastr';
import { Wishlist } from './../interfaces/wishlist.interface';
import { Component, inject, Input, OnInit } from '@angular/core';
import { WishlistService } from './services/wishlist.service';
import { get } from 'http';
import { Product } from '../../../core/models/product.interface';
import { CartService } from '../../cart/services/cart.service';

@Component({
  selector: 'app-wishlist',
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit {
  private readonly wishlistService = inject(WishlistService);
  WishlistProduct: Product = {} as Product;
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  Wishlistitems: Wishlist[] = [];

  ngOnInit(): void {
    this.getWishlist();
  }

  getWishlist(): void {
    this.wishlistService.getLoggedUserwishlist().subscribe({
      next: (res) => {
        this.Wishlistitems = res.data;
      },
    });
  }
  removeitem(id: string): void {
    this.wishlistService.removeProductFromwishlist(id).subscribe({
      next: (res) => {
        this.getWishlist();
      },
    });
  }
}
