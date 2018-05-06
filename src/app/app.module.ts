import { ResponseTimeInterceptor } from './interceptor/response-time';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ResponseTimeInterceptor,
        multi: true
    }  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
