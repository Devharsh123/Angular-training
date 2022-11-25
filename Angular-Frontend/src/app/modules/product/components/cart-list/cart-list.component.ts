import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/utils/product';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {
  productDetails: Product[] = []
  count: number = 0
  constructor(private productApi: ProductService, private route: Router) { }

  ngOnInit(): void {
    this.productApi.cartList().subscribe((res: any) => {
      this.productDetails = res.cart
    })
  }
  onPlus() {
    this.count = this.count + 1
  }
  onMinus(productId: string) {
    if (this.count < 0) {
      this.productApi.addToCart(productId).subscribe((res: any) => {
        console.log(res)
      })
    }
    this.count = this.count - 1
  }

}
