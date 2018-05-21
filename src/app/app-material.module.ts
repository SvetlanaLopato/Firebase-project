import { NgModule } from '@angular/core';
import {
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatTabsModule,
  MatDialogModule,
} from '@angular/material';

@NgModule({
  exports: [
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule,
    MatDialogModule,
  ],
})
export class AppMaterialModule {}
