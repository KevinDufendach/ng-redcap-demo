import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FieldComponent} from './field.component';
import {RadioControlComponent} from './radio-control/radio-control.component';
import {MatButtonModule, MatCheckboxModule, MatRadioModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {CheckboxControlComponent} from './checkbox-control/checkbox-control.component';
import {FieldService} from './field.service';

@NgModule({
  declarations: [
    FieldComponent,
    RadioControlComponent,
    CheckboxControlComponent,
  ],
  providers: [
    FieldService,
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
    FormsModule,
    MatCheckboxModule
  ]
})
export class FieldModule {
}
