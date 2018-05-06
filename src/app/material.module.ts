
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatCheckboxModule, MatIconModule, MatToolbarModule, MatMenuModule} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, CommonModule, MatIconModule, MatToolbarModule, MatMenuModule, MatCheckboxModule],
  exports: [MatButtonModule, MatCheckboxModule, MatIconModule, MatToolbarModule, MatMenuModule,  MatCheckboxModule]
})
export class MaterialModule { }
