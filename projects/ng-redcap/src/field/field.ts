import {REDCapFieldMetadata} from './redcap-field-metadata';

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

export class RadioField extends Field {
  options: Map<string, string>;
  value: string;

  setOptions(optionsString: string) {
    this.options = Field.getOptionMapFromString(optionsString);
  }

  getOptions(): Map<string, string> {
    return this.options;
  }

  getType(): FieldType {
    return FieldType.Radio;
  }

  assignValue(rawValues: object) {
    if (!this.fieldName) {
      console.log('unable to assign value since no field name exists');
    }

    if (rawValues.hasOwnProperty(this.fieldName)) {
      this.value = rawValues[this.fieldName];
    }
  }

  getValue(): string {
    return this.value;
  }

  getREDCapFormattedValues(): object {
    const value = {};

    value[this.fieldName] = this.getValue();

    return value;
  }
}

export class CheckboxField extends Field {
  options: Map<string, string>;
  values = {};

  private static convertBoolToValue(val: boolean) {
    if (typeof val === 'undefined') {
      return '';
    }

    return (val ? '1' : '0');
  }

  assignValue(rawValues: object) {
    if (!this.fieldName) {
      console.log('unable to assign value since no field name exists');
    }

    for (const key of this.options.keys()) {
      const prop = this.fieldName + '___' + key.toLowerCase();
      if (rawValues.hasOwnProperty(prop)) {
        this.values[key] = (rawValues[prop] === '1');
      }
    }
  }

  setOptions(optionsString: string) {
    this.options = Field.getOptionMapFromString(optionsString);
  }

  getOptions(): Map<string, string> {
    return this.options;
  }

  getType(): FieldType {
    return FieldType.Checkbox;
  }

  getValue() {
    return this.values;
  }

  getREDCapFormattedValues(): object {
    const values = {};

    this.options.forEach((value, key) => {
      values[this.fieldName + '___' + key.toLowerCase()] = CheckboxField.convertBoolToValue(this.values[key]);
    });

    return values;
  }
}
