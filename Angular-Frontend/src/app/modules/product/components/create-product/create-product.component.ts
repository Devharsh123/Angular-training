import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { CreateProductData } from 'src/app/utils/product';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage'

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  createProductForm!: FormGroup
  basePath = '/images'
  downloadableURL = ''
  task!: AngularFireUploadTask
 arr:string[]=[];
 
  constructor(
    private fb: FormBuilder,
    private productApi: ProductService,
    private route: Router,
    private fireStorage: AngularFireStorage) { this.createForm() }

  ngOnInit(): void {
  }

  createForm() {
    this.createProductForm = this.fb.group({
      pname: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      discount: ['', Validators.required],
      tax: ['', Validators.required]
    })
  }

  async onFileChanged(event: any) {
    const file = event.target.files[0];
    if (file) {
      const filePath = `${this.basePath}/${file.name}`
      this.task = this.fireStorage.upload(filePath, file);

      (await this.task).ref.getDownloadURL().then((url: any) => {
       
        url.split('/').map((data: any, index: number) => {
          if (index > 4) { this.arr.push(data) }
        })
        this.downloadableURL = this.arr.join('/')
        console.log(this.arr.join('/'),this.downloadableURL)
      }
      )
    } else {
      alert('No Images selected')
      this.downloadableURL = ''
    }
  }

  adminCreateProduct(form: FormGroup) {

    const create: CreateProductData = {
      img: this.downloadableURL,
      pname: form.value.pname,
      description: form.value.description,
      price: form.value.price,
      discount: form.value.discount,
      tax: form.value.tax
    }
    return this.productApi.createProduct(create).subscribe((res: any) => {
      console.log(res)
      this.route.navigate(['/product/admin-product-list'])
    })
  }

}
