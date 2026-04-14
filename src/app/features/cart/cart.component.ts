import { Component, inject, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { Cart } from './models/cart.interface';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  imports: [RouterLink],
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  cartDetails: Cart = {} as Cart;

  ngOnInit(): void {
    this.getLoggedUserdata();
  }
  getLoggedUserdata(): void {
    this.cartService.getLoggedUsercart().subscribe({
      next: (res) => {
        this.cartDetails = res.data;
      },
    });
  }

  removeItem(id: string): void {
    this.cartService.removeSpecificCartitem(id).subscribe({
      next: (res) => {
        this.cartService.countNumber.next(res.numOfCartItems);
        this.cartDetails = res.data;
        this.toastrService.success('Item Is Removed', 'FreshCart');
      },
    });
  }
  updateCount(id: string, count: number): void {
    this.cartService.updteCartcount(id, count).subscribe({
      next: (res) => {
        this.cartService.countNumber.next(res.numOfCartItems);
        this.cartDetails = res.data;
        this.toastrService.success('Count Is Updated', 'FreshCart');
      },
    });
  }
}
