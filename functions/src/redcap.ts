import * as cfg from './config';
import * as request from 'request-promise-native';
import * as express from 'express';

export interface REDCapConfig {
  token: string,
  uri: string,
}

export interface REDCapMetadata {
  "field_name": string,
  "form_name": string,
  "section_header": string,
  "field_type": string,
  "field_label": string,
  "select_choices_or_calculations": string,
  "field_note": string,
  "text_validation_type_or_show_slider_number": string,
  "text_validation_min": string,
  "text_validation_max": string,
  "identifier": string,
  "branching_logic": string,
  "required_field": string,
  "custom_alignment": string,
  "question_number": string,
  "matrix_group_name": string,
  "matrix_ranking": string,
  "field_annotation": string
}

export class Redcap {
  config: REDCapConfig;
  headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json'
  };

  constructor() {
    this.config = cfg.config;
  }

  getMetadata(form?: string): Promise<REDCapMetadata[]> {
    const options = {
      uri: this.config.uri,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      json: true, // Automatically parses the JSON string in the response
      form: {
        'token': this.config.token,
        'content': 'metadata',
        'format': 'json',
        'returnFormat': 'json',
        'fields[0]': '',
        'forms[0]': (form || '')
      }
    };

    return new Promise<REDCapMetadata[]>((resolve, reject) => {
      const p1 = request.post(options);
      const p2 = p1.then((result) => {
        // ToDo: check to be sure data received are appropriately formatted
        const resultData = <REDCapMetadata[]>result;
        resolve(resultData);
      });
      p2.catch( (error) => {
        console.log(error);
        reject(error);
      });
    });
  }
}
