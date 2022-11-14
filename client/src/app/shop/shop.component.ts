import { Component, OnInit } from '@angular/core';
import {IProduct} from "../shared/models/product";
import {ShopService} from "./shop.service";
import {IPagination} from "../shared/models/pagination";
import {IBrand} from "../shared/models/brand";
import {IProductType} from "../shared/models/productType";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products: IProduct[] | undefined;
  brands: IBrand[] | undefined;
  productTypes: IProductType[] | undefined;
  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getProductTypes();
  }

  getProducts() {
    this.shopService.getProducts().subscribe({
      next: (response: IPagination) => this.products = response.data,
      error: (err: Error) => console.log(err),
      complete: () => console.log('Products have been received'),
    });
  }

  getBrands() {
      this.shopService.getBrands().subscribe({
      next: (response: IBrand[]) => this.brands = response,
      error: (err: Error) => console.log(err),
      complete: () => console.log('Product brands have been received'),
    });
  }

  getProductTypes() {
    this.shopService.getBrands().subscribe({
      next: (response: IProductType[]) => this.productTypes = response,
      error: (err: Error) => console.log(err),
      complete: () => console.log('Product types have been received'),
    });
  }
}
