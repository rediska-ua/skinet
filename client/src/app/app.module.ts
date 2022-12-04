import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import {CoreModule} from "./core/core.module";
import {ShopModule} from "./shop/shop.module";
import {HomeModule} from "./home/home.module";
import {ErrorInterseptor} from "./core/interseptors/error.interseptor";

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        CoreModule,
        HomeModule
    ],
    providers: [
        HttpClient,
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterseptor, multi: true}
    ],
    exports: [
        AppComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
