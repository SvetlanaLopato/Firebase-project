import { NgModule } from '@angular/core';
import {
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
} from '@angular/material';

@NgModule({
    exports: [
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
    ],
})
export class AppMaterialModule {}
