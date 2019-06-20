import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FieldComponent} from './field.component';
import {RadioControlComponent} from './radio-control/radio-control.component';
import {MatButtonModule, MatRadioModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {CheckboxControlComponent} from './checkbox-control/checkbox-control.component';

@NgModule({
  declarations: [
    FieldComponent,
    RadioControlComponent,
    CheckboxControlComponent,
  ],
  exports: [
    FieldComponent,
    RadioControlComponent,
    CheckboxControlComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatRadioModule,
    FormsModule
  ]
})
export class FieldModule {
}
