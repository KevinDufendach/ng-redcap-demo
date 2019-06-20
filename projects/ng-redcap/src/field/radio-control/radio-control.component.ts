import {Component, Input, OnInit} from '@angular/core';
import {RadioField} from '../field';

@Component({
  selector: 'rcap-radio-control',
  templateUrl: './radio-control.component.html',
  styleUrls: ['./radio-control.component.css']
})
export class RadioControlComponent implements OnInit {
  optionKeys: string[];

  @Input() field: RadioField;

  constructor( ) {
  }

  ngOnInit() {
    if (this.field instanceof RadioField) {
      this.optionKeys = Array.from(this.field.getOptions().keys());
    } else {
      console.log('field is not an instance of RadioField: ');
      console.log(this.field);
    }
  }
}
