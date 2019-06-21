import {Injectable} from '@angular/core';
import {Field} from './field';
import {AngularFireFunctions} from '@angular/fire/functions';

@Injectable({
  providedIn: 'root'
})
export class FieldService {
  fields: Field[];

  constructor(private fns: AngularFireFunctions) {
  }

  static updateValues(fields: Field[], values: object): Field[] {
    if (values && fields) {
      for (const field of fields) {
        field.assignValue(values);
      }
    }

    return fields;
  }

  static getREDCapFormattedValues(fields: Field[]): object {
    const formattedValues = {};

    for (const field of fields) {
      const fieldVals = field.getREDCapFormattedValues();

      Object.keys(fieldVals).forEach((key) => {
        formattedValues[key] = fieldVals[key] || '';
      });
    }

    return formattedValues;
  }

  loadProjectData(form?: string): Promise<Field[]> {
    const getMetadata = this.fns.httpsCallable('getMetadata');

    return new Promise<Field[]>((resolve, reject) => {
      getMetadata({form})
        .subscribe(metadata => {
            Field.generateFieldsFromMetadataList(metadata)
              .then((fieldList) => {
                this.fields = fieldList;

                resolve(this.fields);
              })
              .catch((e) => {
                reject(e);
              });
          },
          error => {
            reject(error);
          });

    });

  }

  loadUserRecords(form?: string): Promise<any> {
    const getRecordExport = this.fns.httpsCallable('getRecord');

    return new Promise<any>((resolve, reject) => {
      getRecordExport({form})
        .subscribe(result => {
            FieldService.updateValues(this.fields, result);
            resolve(result);
          },
          error => {
            // ToDo: Do not error if user does not exist (has no values)
            reject(error);
          });

    });
  }

  submitFields(fields: Field[]): Promise<any> {
    const formattedValues = FieldService.getREDCapFormattedValues(fields);

    return new Promise<any>((resolve, reject) => {
      const submitFieldsFn = this.fns.httpsCallable('submitFields');

      submitFieldsFn({
        records: formattedValues
      })
        .subscribe(result => {
            resolve(result);
          },
          error => {
            console.log(error);
          });
    });
  }
}
