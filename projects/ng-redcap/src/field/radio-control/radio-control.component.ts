import {Component, Input, OnInit} from '@angular/core';
import {RadioField} from '../field';

@Component({
  selector: 'rcap-field-radio',
  templateUrl: './radio-control.component.html',
  styleUrls: ['./radio-control.component.css']
})
export class RadioControlComponent implements OnInit {
  // typedField: RadioField;
  optionKeys: string[];
  // innerValue: string;

  @Input() field: RadioField;

  constructor( ) {
  }

  ngOnInit() {
    // console.log('checking field instance');
    if (this.field instanceof RadioField) {
      this.optionKeys = Array.from(this.field.getOptions().keys());
    } else {
      console.log('field is not an instance of RadioField: ');
      console.log(this.field);
    }
  }
}
