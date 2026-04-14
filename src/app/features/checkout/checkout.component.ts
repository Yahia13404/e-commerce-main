import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../shared/components/input/input.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../cart/services/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  id: string | null = null;
  value: string | null = null;
  checkOutform!: FormGroup;
  ngOnInit(): void {
    this.initForm();
    this.getCartid();
  }
  getCartid(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (urlParams) => {
        this.id = urlParams.get('id');
      },
    });
  }
  initForm(): void {
    this.checkOutform = this.fb.group({
      shippingAdress: this.fb.group({
        details: [null, [Validators.required]],
        phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
        city: [null, [Validators.required]],
      }),
    });
  }
  submitForm(event: SubmitEvent): void {
    const action = (event.submitter as HTMLButtonElement).value;

    if (this.checkOutform.valid) {
      if (action === 'visa') {
        this.cartService.checkOutsession(this.id, this.checkOutform.value).subscribe({
          next: (res) => {
            if (res.status === 'success') {
              window.open(res.session.url, '_self');
            }
          },
        });
      } else if (action === 'cash') {
        this.cartService.createCashorder(this.id, this.checkOutform.value).subscribe({
          next: (res) => {
            if (res.status === 'success') {
              this.router.navigate(['/cart']);
            }
          },
        });
      }
    }
  }
}
