
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatCheckboxModule, MatIconModule} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule,CommonModule,MatIconModule],
  exports: [MatButtonModule, MatCheckboxModule,MatIconModule],
})
export class MaterialModule { }
