import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Field, FieldRadio} from './field';

@Component({
  selector: 'rcap-field-radio',
  templateUrl: './radio-control.component.html',
  styleUrls: ['./radio-control.component.css']
})
export class RadioControlComponent implements OnInit {
  @Input() field: Field;

  innerValue: string;

  @Output() valueChange = new EventEmitter<string>();

  @Input()
  get value() {
    return this.innerValue;
  }

  set value(val) {
    if (val !== this.innerValue) {
      this.innerValue = val;
      this.valueChange.emit(this.innerValue);
    }
  }

  typedField: FieldRadio;
  optionKeys: string[];

  constructor( ) { }

  ngOnInit() {
    if (this.field instanceof FieldRadio) {
      this.typedField = this.field;
      this.optionKeys = Array.from(this.typedField.getOptions().keys());
    } else {
      console.log('field is not an instance of FieldRadio: ');
      console.log(this.field);
    }
  }

  setValue(value: string) {
    this.value = value;
  }

}