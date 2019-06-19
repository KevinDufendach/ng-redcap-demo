import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FieldComponent} from './field.component';
import {RadioFormComponent} from './radio-form.component';

@NgModule({
  declarations: [
    FieldComponent,
    RadioFormComponent,
  ],
  exports: [
    FieldComponent,
    RadioFormComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class FieldModule {
}
