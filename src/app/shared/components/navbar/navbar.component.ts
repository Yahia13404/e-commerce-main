import { initFlowbite } from 'flowbite';
import { FlowbiteService } from './../../../core/services/flowbite.service';
import { Component, inject, Input, input, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';
import { CartService } from '../../../features/cart/services/cart.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(private FlowbiteService: FlowbiteService) {}
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);
  private readonly id = inject(PLATFORM_ID);

  @Input({ required: true }) isLogin!: boolean;
  count!: number;
  ngOnInit(): void {
    this.FlowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
    this.getCartnumber();
    if (isPlatformBrowser(this.id)) {
      this.getAllDatacart();
    }
  }
  getAllDatacart(): void {
    this.cartService.getLoggedUsercart().subscribe({
      next: (res) => {
        this.cartService.countNumber.next(res.numOfCartItems);
      },
    });
  }
  getCartnumber(): void {
    this.cartService.countNumber.subscribe({
      next: (value) => {
        this.count = value;
      },
    });
  }
  signOut(): void {
    this.authService.logOut();
  }
}
