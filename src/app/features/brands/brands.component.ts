import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from './services/brands.service';
import { Brands } from './interfaces/brands.interface';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit {
  private readonly BrandsService = inject(BrandsService);
  brandsList: Brands[] = [];
  ngOnInit(): void {
    this.getAllBrands();
  }
  getAllBrands(): void {
    this.BrandsService.getBrands().subscribe({
      next: (res) => {
        this.brandsList = res.data;
      },
    });
  }
}
