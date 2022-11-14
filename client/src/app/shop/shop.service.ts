import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IPagination} from "../shared/models/pagination";
import {Observable} from "rxjs";
import {IProductType} from "../shared/models/productType";
import {IBrand} from "../shared/models/brand";

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private apiUrl: string = 'https://localhost:7113/api/';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<IPagination> {
    return this.http.get<IPagination>(this.apiUrl + "products?pageSize=50");
  }

  getBrands(): Observable<IBrand[]> {
    return this.http.get<IBrand[]>(this.apiUrl + "products/brands");
  }

  getTypes(): Observable<IProductType[]> {
    return this.http.get<IProductType[]>(this.apiUrl + "products/types");
  }
}
