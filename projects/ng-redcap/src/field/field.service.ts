import {Injectable} from '@angular/core';
import {Field} from './field';

@Injectable({
  providedIn: 'root'
})
export class FieldService {
  constructor() {
  }

  getREDCapFormattedValues(fields: Field[]): object {
    const formattedValues = {};

    for (const field of fields) {
      const fieldVals = field.getREDCapFormattedValues();

      Object.keys(fieldVals).forEach((key) => {
        formattedValues[key] = fieldVals[key] || '';
      });
    }

    return formattedValues;
  }
}
