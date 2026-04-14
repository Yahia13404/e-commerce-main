import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from "../../../../shared/components/card/card.component";
import { ProductsService } from '../../../../core/services/products/products.service';
import { Product } from '../../../../core/models/product.interface';

@Component({
  selector: 'app-popular-products',
  imports: [CardComponent],
  templateUrl: './popular-products.component.html',
  styleUrl: './popular-products.component.css',
})
export class PopularProductsComponent implements OnInit {
  private readonly productsService = inject(ProductsService)
  productsList:Product[]=[]
  ngOnInit(): void {
    this.getAllProductsdata()
  }
  getAllProductsdata():void{
    this.productsService.getAllproducts().subscribe({
      next:(res)=> {
        
        this.productsList= res.data
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
}
