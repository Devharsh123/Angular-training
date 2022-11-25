import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CreateProductData, Product, UpdateProductData } from '../utils/product';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl: string = environment.url

  constructor(private http: HttpClient, private authService: AuthService) { }

  getProducts(search?: string, offset?:number, rows?: number, sort?: string): Observable<Product[]> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })

    let params = new HttpParams()
    
    if (search) {
    params =  params.set('search',search)
    }
    if(sort){
      params = params.set('sort',sort)
    }
    if(offset){
      params = params.set('offset',offset)
    }
    if(rows){
      params = params.set('rows',rows)
    }
    console.log(params,'params')

      return this.http.get(`${this.apiUrl}/products`, { headers: headers, params})
        .pipe(
          map((data: any) => {
            const details: Product[] = data.products
            return details
          })
        )
  }

  getProductById(userId: string, search?: string, offset?:number, rows?: number, sort?: string): Observable<Product[]> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })

    let params = new HttpParams()
    
    if(userId){
      params = params.set('userId', userId)
    }
    if (search) {
    params =  params.set('search',search)
    }
    if(sort){
      params = params.set('sort',sort)
    }
    if(offset){
      params = params.set('offset',offset)
    }
    if(rows){
      params = params.set('rows',rows)
    }
    console.log(params,'params')

    return this.http
      .get(`${this.apiUrl}/products`, { headers: headers, params })
      .pipe(
        map((data: any) => {
          const details: Product[] = data.products
          return details
        })
      )
  }

  createProduct(product: CreateProductData) {
    let auth = this.authService.loadUserToken()
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': `${auth?.token}`
    })

    return this.http.post(`${environment.url}/create`, product, { headers: headers })
  }
  updateProduct(product: UpdateProductData, productId: string) {
    let auth = this.authService.loadUserToken()
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': `${auth?.token}`
    })
    return this.http.put(`${environment.url}/update/${productId}`, product, { headers: headers })
  }
  deleteProduct(productId: string) {
    let auth = this.authService.loadUserToken()
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': `${auth?.token}`
    })
    console.log(headers, 'dlt')
    return this.http.delete(`${environment.url}/delete/${productId}`, { headers: headers })
  }

  addToCart(productId: string) {
    let auth = this.authService.loadUserToken()
    console.log(auth, 'agya')
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': `${auth?.token}`
    })
    console.log(auth, headers, 'authayi')
    return this.http.post(`${environment.url}/toggleCart/${productId}`, { headers: headers })
  }

  cartList() {
    let auth = this.authService.loadUserToken()
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': `${auth?.token}`
    })
    return this.http.get(`${environment.url}/getCartProducts`, { headers: headers })
  }

  getProductByName(search: string, userId?: string, productId?: string, offset?: number, rows?: number, sort?: string) {

  }
}
