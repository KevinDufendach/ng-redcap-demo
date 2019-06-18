export interface REDCapFieldMetadata {
  'field_name': string;
  'form_name': string;
  'section_header': string;
  'field_type': string;
  'field_label': string;
  'select_choices_or_calculations': string;
  'field_note': string;
  'text_validation_type_or_show_slider_number': string;
  'text_validation_min': string;
  'text_validation_max': string;
  'identifier': string;
  'branching_logic': string;
  'required_field': string;
  'custom_alignment': string;
  'question_number': string;
  'matrix_group_name': string;
  'matrix_ranking': string;
  'field_annotation': string;
}

export enum FieldType {
  Radio,
  Checkbox,
  Other,
}

export class Field {
  fieldName?: string;
  formName?: string;
  sectionHeader?: string;
  fieldType?: FieldType;
  fieldLabel?: string;
  selectChoicesOrCalculation?: string;
  fieldNote?: string;
  textValidationTypeOrShowSliderNumber?: string;
  textValidationMin?: string;
  textValidationMax?: string;
  identifier?: string;
  branchingLogic?: string;
  requiredField?: string;
  customAlignment?: string;
  questionNumber?: string;
  matrixGroupName?: string;
  matrixRanking?: string;
  fieldAnnotation?: string;

  options: any;
  value: any;

  constructor(fieldMetadata?: REDCapFieldMetadata) {
    if (fieldMetadata) {
      this.buildFromMetadata(fieldMetadata);
    }
  }

  static generateFieldsFromMetadataList(rawFields: REDCapFieldMetadata[]): Field[] {
    const fields = new Array<Field>();
    for (const rawField of rawFields) {
      fields.push(new Field(rawField));
    }

    return fields;
  }

  buildFromMetadata(md: REDCapFieldMetadata) {
    this.fieldName = md.field_name;
    this.formName = md.form_name;
    this.sectionHeader = md.section_header;

    // Assign field type
    switch (md.field_type) {
      case 'radio': {
        this.fieldType = FieldType.Radio;
        break;
      }
      case 'checkbox': {
        this.fieldType = FieldType.Checkbox;
        break;
      }
      default: {
        this.fieldType = FieldType.Other;
      }
    }

    this.fieldLabel = md.field_label;
    this.selectChoicesOrCalculation = md.select_choices_or_calculations;
    this.fieldNote = md.field_note;
    this.textValidationTypeOrShowSliderNumber = md.text_validation_type_or_show_slider_number;
    this.textValidationMin = md.text_validation_min;
    this.textValidationMax = md.text_validation_max;
    this.identifier = md.identifier;
    this.branchingLogic = md.branching_logic;
    this.requiredField = md.required_field;
    this.customAlignment = md.custom_alignment;
    this.questionNumber = md.question_number;
    this.matrixGroupName = md.matrix_group_name;
    this.matrixRanking = md.matrix_ranking;
    this.fieldAnnotation = md.field_annotation;
  }

  assignValue(values: object) {
    switch (this.fieldType) {
      case FieldType.Radio: {

        break;
      }
      case FieldType.Checkbox: {

        break;
      }
    }
  }
}
