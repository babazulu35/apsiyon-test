import { PaginationComponent } from './components/pagination/pagination.component';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
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
import { SortItemComponent } from './components/sort-item/sort-item.component';
import { AppRoutingModule } from './app-routing.module';
import { ItemListComponent } from './components/item-list/item-list.component';
import { CreateRecordComponent } from './components/create-record/create-record.component';


@NgModule({
  declarations: [
    AppComponent,
    SortItemComponent,
    ItemListComponent,
    CreateRecordComponent,
    ToolbarComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule

  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ResponseTimeInterceptor,
        multi: true
    }
  ],
  entryComponents:[PaginationComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
