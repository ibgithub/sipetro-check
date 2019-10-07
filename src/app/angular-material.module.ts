import { NgModule } from '@angular/core';
import { 
   MatDatepickerModule, 
   MatNativeDateModule,
   MatFormFieldModule,
   MatInputModule,
   MatTableModule,
   MatDividerModule,
   MatSelectModule,
   MatSortModule,
} from '@angular/material';

@NgModule({
   imports: [
      MatDatepickerModule,
      MatNativeDateModule,
      MatFormFieldModule,
      MatInputModule,
      MatTableModule,
      MatSortModule,
      MatDividerModule,
      MatSelectModule,
   ],
   exports: [
      MatDatepickerModule,
      MatNativeDateModule,
      MatFormFieldModule,
      MatInputModule,
      MatTableModule,
      MatSortModule,
      MatDividerModule,
      MatSelectModule,
   ]
})

export class AngularMaterialModule { }