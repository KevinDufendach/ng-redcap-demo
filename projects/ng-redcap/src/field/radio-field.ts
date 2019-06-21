import {Field, FieldType} from './field';

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
