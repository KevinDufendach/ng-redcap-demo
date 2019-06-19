import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FieldComponent} from './field.component';
import {RadioControlComponent} from './radio-control.component';
import {MatButtonModule, MatRadioModule} from '@angular/material';
import {FormsModule} from '@angular/forms';

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
    CommonModule,
    MatButtonModule,
    MatRadioModule,
    FormsModule
  ]
})
export class FieldModule {
}
