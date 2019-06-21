import {Injectable} from '@angular/core';
import {CheckboxField, Field, RadioField} from './field';
import {AngularFireFunctions} from '@angular/fire/functions';
import {REDCapFieldMetadata} from './redcap-field-metadata';

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

  static generateFieldsFromMetadataList(redCapFieldMetadata: REDCapFieldMetadata[]): Promise<Field[]> {
    const fields = new Array<Field>();

    return new Promise<Field[]>((resolve, reject) => {
      let errEncountered = false;

      for (const rawField of redCapFieldMetadata) {
        FieldService.buildFromMetadata(rawField)
          .then(newField => {
            fields.push(newField);
          })
          .catch((error) => {
            reject('error when trying to build field');
            errEncountered = true;
          });

        if (errEncountered) {
          break;
        }
      }

      if (!errEncountered) {
        resolve(fields);
      }
    });
  }

  static buildFromMetadata(rawField: REDCapFieldMetadata): Promise<Field> {
    return new Promise<Field>((resolve, reject) => {
      switch (rawField.field_type) {
        case 'radio':
          resolve(new RadioField(rawField));
          break;
        case 'checkbox':
          resolve(new CheckboxField(rawField));
          break;
        default:
          reject('Unknown field type');
      }

    });

  }

  loadProjectData(form?: string): Promise<Field[]> {
    const getMetadata = this.fns.httpsCallable('getMetadata');

    return new Promise<Field[]>((resolve, reject) => {
      getMetadata({form})
        .subscribe(metadata => {
            FieldService.generateFieldsFromMetadataList(metadata)
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

  submitFields(): Promise<any> {
    const formattedValues = FieldService.getREDCapFormattedValues(this.fields);

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
