import * as cfg from './config';
import * as request from 'request-promise-native';
import {Field} from '../../projects/ng-redcap/src/lib/field';

export interface REDCapConfig {
  token: string,
  uri: string,
}

export class REDCapService {
  config: REDCapConfig;
  headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json'
  };

  constructor() {
    this.config = cfg.config;
  }

  getMetadata(form?: string): Promise<Field[]> {
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

    return new Promise<Field[]>((resolve, reject) => {
      const p1 = request.post(options);
      const p2 = p1.then((result) => {
        // ToDo: check to be sure data received are appropriately formatted
        const resultData = <Field[]>result;
        resolve(resultData);
      });
      p2.catch( (error) => {
        console.log(error);
        reject(error);
      });
    });
  }

  getTestMetaData(form?: string): Promise<Field[]> {
    const options = {
      uri: cfg.testConfig.uri,
      json: true, // Automatically parses the JSON string in the response
    };

    return new Promise<Field[]>((resolve, reject) => {
      const p1 = request.get(options);
      const p2 = p1.then((result) => {
        // ToDo: check to be sure data received are appropriately formatted
        const resultData = <Field[]>result;
        resolve(resultData);
      });
      p2.catch( (error) => {
        console.log(error);
        reject(error);
      });
    });
  }
}
