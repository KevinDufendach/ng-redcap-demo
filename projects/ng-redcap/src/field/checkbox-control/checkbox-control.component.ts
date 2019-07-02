import {Component, Input, OnInit} from '@angular/core';
import {CheckboxField} from '../checkbox-field';

@Component({
  selector: 'rcap-checkbox-control',
  templateUrl: './checkbox-control.component.html',
  styleUrls: ['./checkbox-control.component.css']
})
export class CheckboxControlComponent implements OnInit {
  optionKeys: string[];

  @Input() field: CheckboxField;

  constructor() { }

  ngOnInit() {
    if (this.field instanceof CheckboxField) {
      this.optionKeys = Array.from(this.field.getOptions().keys());
    } else {
      console.log('field is not an instance of RadioField: ');
      console.log(this.field);
    }
  }

}
