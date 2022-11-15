import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IProduct} from "../shared/models/product";
import {ShopService} from "./shop.service";
import {IPagination} from "../shared/models/pagination";
import {IBrand} from "../shared/models/brand";
import {IProductType} from "../shared/models/productType";
import {ShopParams} from "../shared/models/shopParams";



@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search') searchTerm!: ElementRef;
  products: IProduct[] | undefined;
  brands: IBrand[] | undefined;
  productTypes: IProductType[] | undefined;
  shopParams = new ShopParams();
  totalCount: number = 0;
  sortOptions = [
    {name: "Alphabetical", value: "name"},
    {name: "Price: Low to High", value: "priceAsc"},
    {name: "Price: High to Low", value: "priceDesc"}
  ]

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getProductTypes();
  }

  getProducts() {
    this.shopService.getProducts(this.shopParams).subscribe({
      next: (response: IPagination) => {
        console.log(response);
        this.products = response.data;
        this.shopParams.pageNumber = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
        this.totalCount = response.count;
      },
      error: (err: Error) => console.log(err),
      complete: () => console.log('Products have been received'),
    });
  }

  getBrands() {
      this.shopService.getBrands().subscribe({
      next: (response: IBrand[]) => this.brands = [{id: 0, name: "All"}, ...response],
      error: (err: Error) => console.log(err),
      complete: () => console.log('Product brands have been received'),
    });
  }

  getProductTypes() {
    this.shopService.getTypes().subscribe({
      next: (response: IProductType[]) => this.productTypes = [{id: 0, name: "All"}, ...response],
      error: (err: Error) => console.log(err),
      complete: () => console.log('Product types have been received'),
    });
  }

  onBrandSelected(brandId: number) {
    this.shopParams.brandId = brandId;
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.getProducts();
  }

  onSortSelected(sort: string) {
    this.shopParams.sort = sort;
    this.getProducts();
  }

  onPageChanged(event: any) {
    this.shopParams.pageNumber = event;
    this.getProducts();
  }

  onSearch() {
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.getProducts();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}
