import { NgModule } from '@angular/core';
import { NgRedcapComponent } from './ng-redcap.component';
import {FieldModule} from '../../field/field.module';

@NgModule({
  declarations: [NgRedcapComponent],
  imports: [
    FieldModule
  ],
  exports: [
    NgRedcapComponent,
    FieldModule
  ]
})
export class NgRedcapModule { }
