import { CreateRecordComponent } from './components/create-record/create-record.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemListComponent } from './components/item-list/item-list.component';

const appRoutes: Routes = [
  {
    path: '', component: ItemListComponent
  },
  {
    path: 'create', component: CreateRecordComponent
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
