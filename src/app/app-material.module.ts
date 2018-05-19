import { NgModule } from '@angular/core';
import {
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSnackBarModule,
} from '@angular/material';

@NgModule({
  exports: [
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSnackBarModule,
  ],
})
export class AppMaterialModule {}
