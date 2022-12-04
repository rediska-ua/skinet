import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
import {IPagination} from "../../shared/models/pagination";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss']
})
export class TestErrorComponent implements OnInit {
  baseUrl = environment.apiUrl;
  validationErrors: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  get400Error() {
    this.http.get(this.baseUrl + 'buggy/badrequest').subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (err: Error) => console.log(err),
      complete: () => console.log('400 error'),
    });
  }

  get500Error() {
    this.http.get(this.baseUrl + 'buggy/servererror').subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (err: Error) => console.log(err),
      complete: () => console.log('500 error'),
    });
  }

  get404Error() {
    this.http.get(this.baseUrl + 'product/42').subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (err: Error) => console.log(err),
      complete: () => console.log('404 error'),
    });
  }

  get400ValidationError() {
    this.http.get(this.baseUrl + 'productS/fortytwo').subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (err: any) => {
        this.validationErrors = err.errors;
      },
      complete: () => console.log('400 validation error'),
    });
  }
}
