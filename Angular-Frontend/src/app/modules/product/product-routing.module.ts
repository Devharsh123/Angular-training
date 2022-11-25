import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminProductListComponent } from './components/admin-product-list/admin-product-list.component';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { ProductDashboardComponent } from './components/product-dashboard/product-dashboard.component';
import { ProductSettingComponent } from './components/product-setting/product-setting.component';

const routes: Routes = [
  {
    path: '', component: ProductDashboardComponent, children: [
      { path: 'create', component: CreateProductComponent },
      { path: 'admin-product-list', component: AdminProductListComponent },
      { path: 'update-product/:productId', component: ProductSettingComponent },
      { path: 'cart-list', component: CartListComponent },
      { path: 'upload', component: FileUploaderComponent },
      { path: '', redirectTo:'admin/home',pathMatch:'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
