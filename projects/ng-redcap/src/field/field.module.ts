import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FieldComponent} from './field.component';
import {FieldRadioComponent} from './field-radio.component';

@NgModule({
  declarations: [
    FieldComponent,
    FieldRadioComponent,
  ],
  exports: [
    FieldComponent,
    FieldRadioComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class FieldModule {
}
