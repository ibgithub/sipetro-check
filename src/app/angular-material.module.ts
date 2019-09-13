import { NgModule } from '@angular/core';
import { 
   MatDatepickerModule, 
   MatNativeDateModule,
   MatFormFieldModule,
   MatInputModule,
   MatTableModule,
   MatDividerModule,
} from '@angular/material';

@NgModule({
   imports: [
      MatDatepickerModule,
      MatNativeDateModule,
      MatFormFieldModule,
      MatInputModule,
      MatTableModule,
      MatDividerModule,
   ],
   exports: [
      MatDatepickerModule,
      MatNativeDateModule,
      MatFormFieldModule,
      MatInputModule,
      MatTableModule,
      MatDividerModule,
   ]
})

export class AngularMaterialModule { }