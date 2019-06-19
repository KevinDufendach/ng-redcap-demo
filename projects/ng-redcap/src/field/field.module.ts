import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FieldComponent} from './field.component';
import {RadioControlComponent} from './radio-control.component';
import {MatButtonModule} from '@angular/material';

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
    MatButtonModule
  ]
})
export class FieldModule {
}
