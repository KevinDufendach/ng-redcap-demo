import {Injectable} from '@angular/core';
import {Field} from './field';

@Injectable({
  providedIn: 'root'
})
export class FieldService {
  constructor() {
  }

  getREDCapFormattedValues(fields: Field[]): Map<string, string> {
    const formattedValues = new Map<string, string>();

    for (const field of fields) {
      field.getREDCapFormattedValueMap().forEach((value, key) => {
        formattedValues.set(key, value);
      });
    }

    return formattedValues;
  }
}

