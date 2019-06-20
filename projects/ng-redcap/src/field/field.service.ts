import {Injectable} from '@angular/core';
import {Field} from './field';
import {AngularFireFunctions} from '@angular/fire/functions';

@Injectable({
  providedIn: 'root'
})
export class FieldService {
  constructor(private fns: AngularFireFunctions) {
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

  submitFields(fields: Field[]): Promise<any> {
    const formattedValues = this.getREDCapFormattedValues(fields);

    return new Promise<any>((resolve, reject) => {
      const submitFieldsFn = this.fns.httpsCallable('submitFields');

      submitFieldsFn({
        records: formattedValues
      })
        .subscribe(result => {
            console.log('Fields submitted');
            resolve(result);
          },
          error => {
            console.log(error);
          });
    });
  }
}
