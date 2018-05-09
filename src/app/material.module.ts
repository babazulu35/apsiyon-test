
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatCheckboxModule, MatIconModule, MatToolbarModule, MatMenuModule, MatProgressSpinnerModule} from '@angular/material';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  imports: [
    MatButtonModule, 
    MatCheckboxModule, 
    CommonModule, 
    MatIconModule, 
    MatToolbarModule, 
    MatMenuModule, 
    MatCheckboxModule,
    MatListModule,
    MatCardModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatInputModule
  ],
  exports: [
    MatButtonModule, 
    MatCheckboxModule, 
    MatIconModule, 
    MatToolbarModule, 
    MatMenuModule,  
    MatCheckboxModule, 
    MatListModule,
    MatCardModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatInputModule
  ]
})
export class MaterialModule { }
