
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatCheckboxModule, MatIconModule, MatToolbarModule, MatMenuModule} from '@angular/material';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, CommonModule, MatIconModule, MatToolbarModule, MatMenuModule, MatCheckboxModule,MatListModule,MatCardModule,MatDialogModule],
  exports: [MatButtonModule, MatCheckboxModule, MatIconModule, MatToolbarModule, MatMenuModule,  MatCheckboxModule, MatListModule,MatCardModule,MatDialogModule]
})
export class MaterialModule { }
