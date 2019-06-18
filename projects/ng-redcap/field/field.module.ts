import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldComponent } from './field.component';

@NgModule({
  declarations: [FieldComponent],
  exports: [
    FieldComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FieldModule { }
