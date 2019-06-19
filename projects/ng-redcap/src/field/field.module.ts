import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FieldComponent} from './field.component';
import {RadioControlComponent} from './radio-control.component';

@NgModule({
  declarations: [
    FieldComponent,
    RadioControlComponent,
  ],
  exports: [
    FieldComponent,
    RadioControlComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class FieldModule {
}
