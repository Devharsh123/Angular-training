import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { CartListComponent } from './cart-list.component';
import { ProductService } from 'src/app/services/product.service';
import { HttpClientModule } from '@angular/common/http';

describe('CartListComponent', () => {
  let component: CartListComponent;
  let fixture: ComponentFixture<CartListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        ProductService
      ],
      declarations: [CartListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CartListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', inject([HttpTestingController, ProductService],(httpMock: HttpTestingController, productService: ProductService)=>
  {
    expect(productService).toBeTruthy();
  }));
});
