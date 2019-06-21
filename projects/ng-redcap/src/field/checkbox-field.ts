import {Field, FieldType} from './field';

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
