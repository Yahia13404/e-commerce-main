import { Component, inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { InputComponent } from '../../../shared/components/input/input.component';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private readonly AuthService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly cookieService = inject(CookieService);
  msgError: string = '';
  isLoading: boolean = false;
  subscription: Subscription = new Subscription();
  loginForm!: FormGroup;
  ngOnInit(): void {
    this.initForm();
  }
  initForm(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)],
      ],
    });
  }

  submitForm(): void {
    if (this.loginForm.valid) {
      this.subscription.unsubscribe();
      this.isLoading = true;

      this.subscription = this.AuthService.loginForm(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.message === 'success') {
            this.msgError = '';

            this.cookieService.set('token', res.token);
            setTimeout(() => {
              this.router.navigate(['/home']);
            }, 1000);
          }
          this.isLoading = false;
        },
        error: (err) => {
          this.msgError = err.error.message;
          this.isLoading = false;
        },
      });
    }
  }
}
