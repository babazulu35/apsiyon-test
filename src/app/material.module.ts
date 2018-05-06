
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatCheckboxModule, MatIconModule, MatToolbarModule, MatMenuModule} from '@angular/material';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, CommonModule, MatIconModule, MatToolbarModule, MatMenuModule, MatCheckboxModule,MatListModule,MatCardModule],
  exports: [MatButtonModule, MatCheckboxModule, MatIconModule, MatToolbarModule, MatMenuModule,  MatCheckboxModule, MatListModule,MatCardModule]
})
export class MaterialModule { }
