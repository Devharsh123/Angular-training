import { Component, OnChanges, OnInit } from '@angular/core';
import { faLock, faSearch } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/utils/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // products: Product[] = []
  faLock = faLock
  products: any = []
  search!: string
  sort!: string
  constructor(private productApi: ProductService) {
  }


  ngOnInit(): void {
    this.productApi.getProducts().subscribe((res: Product[]) => {
      console.log(res)
      this.products = res
    })

  }

  onSearching(eventData: { value: string }) {
    console.log(eventData.value, 'value', eventData, 'data')
    this.search = eventData.value

    this.productApi.getProducts(this.search).subscribe((res: Product[]) => {
      this.products = res
    })
  }

  onSorting(eventData: { value: string }) {
    this.sort = eventData.value

    this.productApi.getProducts(undefined, undefined, undefined,this.sort).subscribe((res: Product[]) => {
      this.products = res
    })
  }

  toggleCart(productId: string) {
    console.log(productId, 'id mili')
    this.productApi.addToCart(productId).subscribe((res: any) => {
      console.log(res)
    })
  }

}
