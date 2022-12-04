import { Component, OnInit } from '@angular/core';
import {IProduct} from "../../shared/models/product";
import {ShopService} from "../shop.service";
import {IPagination} from "../../shared/models/pagination";
import {IProductType} from "../../shared/models/productType";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct | undefined;

  constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    this.shopService.getProduct(parseInt(this.activatedRoute.snapshot.paramMap.get('id')!)).subscribe({
      next: (response: IProduct) => {
        this.product = response;
      },
      error: (err: Error) => console.log(err),
      complete: () => console.log('Products have been received')
    });
  }

}
