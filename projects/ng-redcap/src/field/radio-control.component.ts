import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RadioField} from './field';

@Component({
  selector: 'rcap-field-radio',
  templateUrl: './radio-control.component.html',
  styleUrls: ['./radio-control.component.css']
})
export class RadioControlComponent implements OnInit {
  // typedField: RadioField;
  optionKeys: string[];
  innerValue: string;

  @Input() field: RadioField;

  @Output() valueChange = new EventEmitter<string>();

  @Input()
  get value() {
    return this.innerValue;
  }

  set value(val) {
    // console.log('value being set');
    // console.log(this.field);
    if (val !== this.innerValue) {
      this.innerValue = val;
      this.field.value = val;
      this.valueChange.emit(this.innerValue);
    }
  }

  constructor( ) {
  }

  ngOnInit() {
    // console.log('checking field instance');
    if (this.field instanceof RadioField) {
      this.innerValue = this.field.value;
      this.optionKeys = Array.from(this.field.getOptions().keys());
    } else {
      console.log('field is not an instance of RadioField: ');
      console.log(this.field);
    }
  }

  setValue(value: string) {
    this.value = value;
  }

  getValue() {
    return this.innerValue;
  }
}
