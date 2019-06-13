import * as cfg from './config';
import * as request from 'request-promise-native';
import {REDCapFieldMetadata} from '../../projects/ng-redcap/src/lib/field';

export interface REDCapConfig {
  token: string,
  uri: string,
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

  getMetadata(form?: string): Promise<REDCapFieldMetadata[]> {
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

    return new Promise<REDCapFieldMetadata[]>((resolve, reject) => {
      const p1 = request.post(options);
      const p2 = p1.then((result) => {
        // ToDo: check to be sure data received are appropriately formatted
        const resultData = <REDCapFieldMetadata[]>result;
        resolve(resultData);
      });
      p2.catch( (error) => {
        console.log(error);
        reject(error);
      });
    });
  }
}
