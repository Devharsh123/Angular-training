import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../../../../utils/product'
@Component({
  selector: 'app-admin-product-list',
  templateUrl: './admin-product-list.component.html',
  styleUrls: ['./admin-product-list.component.css']
})
export class AdminProductListComponent implements OnInit {
  userId!: string | undefined
  token!: string | undefined
  productDetails: Product[] = []
  search!: string
  sort!: string

  constructor(private authService: AuthService, private productApi: ProductService, private route: Router) { }
  ngOnInit(): void {
    let user = this.authService.loadUserToken()
    this.userId = user?.user
    
    if (this.userId) {
      this.productApi.getProductById(this.userId)
        .subscribe((data: any) => {
          this.productDetails = data
        })
    }
  }

  onSearching(eventData: { value: string }) {
    this.search = eventData.value

    if (this.userId) {
      this.productApi.getProductById(this.userId, this.search).subscribe((res: Product[]) => {
        this.productDetails = res
      })
    }
  }

  onSorting(eventData: { value: string }) {
    this.sort = eventData.value

    if (this.userId) {
      this.productApi.getProductById(this.userId, undefined, undefined, undefined, this.sort).subscribe((res: Product[]) => {
        this.productDetails = res
      })
    }
  }

  onDelete(productId: string) {
    this.productApi.deleteProduct(productId)
      .subscribe((data: any) => {
        console.log(data, 'Product deleted succesfully')
      })
  }

  onUpdate(productId: string) {
    this.route.navigate([`/product/update-product/${productId}`])
  }
}
