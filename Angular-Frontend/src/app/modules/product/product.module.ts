import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductDashboardComponent } from './components/product-dashboard/product-dashboard.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { AdminProductListComponent } from './components/admin-product-list/admin-product-list.component';
import { ProductSettingComponent } from './components/product-setting/product-setting.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../admin/components/header/header.component';
import { AdminModule } from '../admin/admin.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';


@NgModule({
  declarations: [
    ProductDashboardComponent,
    CreateProductComponent,
    AdminProductListComponent,
    ProductSettingComponent,
    CartListComponent,
    FileUploaderComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AdminModule,
    FontAwesomeModule,
  ],
})
export class ProductModule { }
