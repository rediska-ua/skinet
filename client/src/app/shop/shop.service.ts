import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {IPagination} from "../shared/models/pagination";
import {map, Observable} from "rxjs";
import {IProductType} from "../shared/models/productType";
import {IBrand} from "../shared/models/brand";
import {IProduct} from "../shared/models/product";
import {ShopParams} from "../shared/models/shopParams";

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private apiUrl: string = 'https://localhost:7113/api/';

  constructor(private http: HttpClient) { }

    getProducts(shopParams: ShopParams): Observable<IPagination> {
    let queryParams = new HttpParams();

    if (shopParams.brandId !== 0) {
      queryParams = queryParams.append('brandId', shopParams.brandId.toString());
    }

    if (shopParams.typeId !== 0) {
      queryParams = queryParams.append('typeId', shopParams.typeId.toString());
    }

    if (shopParams.search) {
      queryParams = queryParams.append('search', shopParams.search);
    }

    queryParams = queryParams.append('sort', shopParams.sort);
    queryParams = queryParams.append('pageIndex', shopParams.pageNumber.toString());
    queryParams = queryParams.append('pageSize', shopParams.pageSize.toString());

    console.log(queryParams.toString());

    return this.http.get<IPagination>(this.apiUrl + "products", { params: queryParams });
  }

  getBrands(): Observable<IBrand[]> {
    return this.http.get<IBrand[]>(this.apiUrl + "products/brands");
  }

  getTypes(): Observable<IProductType[]> {
    return this.http.get<IProductType[]>(this.apiUrl + "products/types");
  }
}
