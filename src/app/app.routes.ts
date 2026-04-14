import { WishlistComponent } from './features/wishlist/wishlist/wishlist.component';
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { isloggedGuard } from './core/guards/islogged-guard';
import { NotfoundComponent } from './features/notfound/notfound.component';
import { Component } from '@angular/core';
import { DetailsComponent } from './features/details/details.component';
import { CheckoutComponent } from './features/checkout/checkout.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // 🔹 Auth Layout (Lazy)
  {
    path: '',
    canActivate: [isloggedGuard],
    loadComponent: () =>
      import('./core/layouts/auth-layout/auth-layout.component').then((m) => m.AuthLayoutComponent),
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./core/auth/login/login.component').then((m) => m.LoginComponent),
        title: 'Login Page',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./core/auth/register/register.component').then((m) => m.RegisterComponent),
        title: 'Register Page',
      },
      {
        path: 'forgot',
        loadComponent: () =>
          import('./core/auth/forgot-password/forgot-password.component').then(
            (m) => m.ForgotPasswordComponent,
          ),
        title: 'Forgot Password Page',
      },
    ],
  },

  // 🔹 Main Layout (Lazy)
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./core/layouts/blank-layout/blank-layout.component').then(
        (m) => m.BlankLayoutComponent,
      ),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
        title: 'Home Page',
      },
      {
        path: 'cart',
        loadComponent: () => import('./features/cart/cart.component').then((m) => m.CartComponent),
        title: 'Cart Page',
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./features/products/products.component').then((m) => m.ProductsComponent),
        title: 'Products Page',
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./features/brands/brands.component').then((m) => m.BrandsComponent),
        title: 'Brands Page',
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./features/categories/categories.component').then((m) => m.CategoriesComponent),
        title: 'Categories Page',
      },
      {
        path: 'wishlist',
        loadComponent: () =>
          import('./features/wishlist/wishlist/wishlist.component').then(
            (m) => m.WishlistComponent,
          ),
        title: 'Wish List Page',
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./features/all-order/all-order.component').then((m) => m.AllOrderComponent),
        title: 'All Orders Page',
      },
      {
        path: 'details/:slug/:id',
        loadComponent: () =>
          import('./features/details/details.component').then((m) => m.DetailsComponent),
        title: 'Details Page',
      },
      {
        path: 'details/:id',
        component: DetailsComponent,
        title: 'Details Page',
      },
      {
        path: 'checkout/:id',
        component: CheckoutComponent,
        title: 'Checkout Page',
      },
    ],
  },

  // 🔹 Not Found (Lazy)
  {
    path: '**',
    component: NotfoundComponent,
    title: 'NotFound Page',
  },
];
