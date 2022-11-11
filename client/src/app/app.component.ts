
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Skinet';
  private apiUrl = 'https://localhost:7113/api/';

  constructor(private http: HttpClient) {

  }
  ngOnInit(): void {
    console.log(this.http.get(this.apiUrl + 'products'))
  }

}
