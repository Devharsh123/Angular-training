import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { UpdateProductData } from 'src/app/utils/product';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage'


@Component({
  selector: 'app-product-setting',
  templateUrl: './product-setting.component.html',
  styleUrls: ['./product-setting.component.css']
})
export class ProductSettingComponent implements OnInit {
  productForm!: FormGroup
  basePath = '/images'
  downloadableURL = ''
  task!: AngularFireUploadTask
  arr:string[]=[];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: Router,
    private avtRoute: ActivatedRoute,
    private fireStorage: AngularFireStorage
  ) { this.updateForm() }

  ngOnInit(): void {
  }
  updateForm() {
    this.productForm = this.fb.group({
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
  updateProductData(form: FormGroup) {
    const update: UpdateProductData = {
      pname: form.value.pname,
      description: form.value.description,
      price: form.value.price,
      discount: form.value.discount,
      tax: form.value.tax
    }

    const productId = this.avtRoute.snapshot.params['productId']

    return this.productService.updateProduct(update, productId).subscribe((data: any) => {
      console.log(data,'response')
      this.route.navigate(['/product/admin-product-list'])
    })
  }
}
