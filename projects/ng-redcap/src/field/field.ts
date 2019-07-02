import {REDCapFieldMetadata} from './redcap-field-metadata';
import {CheckboxField} from './checkbox-field';
import {RadioField} from './radio-field';

export enum FieldType {
  Radio,
  Checkbox,
  Other,
}

export abstract class Field {
  fieldName: string;
  fieldType: FieldType;
  fieldLabel: string;
  fieldNote: string;
  // textValidationTypeOrShowSliderNumber?: string;
  // textValidationMin?: string;
  // textValidationMax?: string;
  // identifier?: string;
  // branchingLogic?: string;
  // requiredField?: string;
  // customAlignment?: string;
  // questionNumber?: string;
  // matrixGroupName?: string;
  // matrixRanking?: string;
  // fieldAnnotation?: string;

  constructor(md: REDCapFieldMetadata) {
    this.fieldName = md.field_name;
    this.fieldLabel = md.field_label;
    this.fieldNote = md.field_note;
    this.fieldType = this.getType();
    this.setOptions(md.select_choices_or_calculations);
  }

  static generateFieldsFromMetadataList(redCapFieldMetadata: REDCapFieldMetadata[]): Promise<Field[]> {
    const fields = new Array<Field>();

    return new Promise<Field[]>((resolve, reject) => {
      let errEncountered = false;

      for (const rawField of redCapFieldMetadata) {
        this.buildFromMetadata(rawField)
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
    const result = new Promise<Field>((resolve, reject) => {
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
    return result;
  }

  static getOptionMapFromString(optionsString: string) {
    const options = new Map<string, string>();
    const ops = optionsString.split('|'); // TODO: determine what happens when there's a pipe in the string

    for (const op of ops) {
      const optionRegEx = /([\-\w\d]+),\s(.*)/g; // note: need to set with each iteration
      const match = optionRegEx.exec(op);
      if (match && match.length > 2) {
        options.set(match[1], match[2]);
      } else {
        console.log('no match found: ' + op);
      }
    }

    return options;
  }

  abstract getType(): FieldType;

  abstract setOptions(optionsString: string);

  abstract assignValue(values: object);

  abstract getValue();

  abstract getREDCapFormattedValues(): object;
}



