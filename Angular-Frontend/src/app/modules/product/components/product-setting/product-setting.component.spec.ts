import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductService } from 'src/app/services/product.service';

import { ProductSettingComponent } from './product-setting.component';

describe('ProductSettingComponent', () => {
  let component: ProductSettingComponent;
  let fixture: ComponentFixture<ProductSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        ProductService
      ],
      declarations: [ProductSettingComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', inject([HttpTestingController, ProductService],(httpMock: HttpTestingController, productService: ProductService) => {
    expect(productService).toBeTruthy();
  }));
});
