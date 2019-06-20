import * as cfg from './config';
import * as request from 'request-promise-native';
import {REDCapFieldMetadata} from '../../projects/ng-redcap/src/field/redcap-field-metadata';
import * as functions from 'firebase-functions';

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

  getMetadata(form?: string): Promise<REDCapFieldMetadata[]> {
    const options = {
      uri: this.config.uri,
      headers: this.headers,
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
        const resultData = <REDCapFieldMetadata[]> result;
        resolve(resultData);
      });
      p2.catch((error) => {
        console.log(error);
        reject(error);
      });
    });
  }

  // getTestMetaData(form?: string): Promise<REDCapFieldMetadata[]> {
  //   const options = {
  //     uri: cfg.testConfig.uri,
  //     json: true, // Automatically parses the JSON string in the response
  //   };
  //
  //   return new Promise<REDCapFieldMetadata[]>((resolve, reject) => {
  //     const p1 = request.get(options);
  //     const p2 = p1.then((result) => {
  //       // ToDo: check to be sure data received are appropriately formatted
  //       const resultData = <REDCapFieldMetadata[]> result;
  //       resolve(resultData);
  //     });
  //     p2.catch((error) => {
  //       console.log(error);
  //       reject(error);
  //     });
  //   });
  // }

  getRecordExport(userId: string, form?: string): Promise<object> {
    const options = {
      uri: this.config.uri,
      headers: this.headers,
      json: true, // Automatically parses the JSON string in the response
      form: {
        'token': this.config.token,
        'content': 'record',
        'format': 'json',
        'returnFormat': 'json',
        'type': 'flat',
        'records[0]': userId,
        'fields[0]': '',
        'forms[0]': (form || ''),
        'rawOrLabel': 'raw',
        'rawOrLabelHeaders': 'raw',
        'exportCheckboxLabel': 'false',
        'exportSurveyFields': 'false',
        'exportDataAccessGroups': 'false',
      }
    };

    return new Promise<object>((resolve, reject) => {
      const p1 = request.post(options);
      const p2 = p1.then((result) => {
        // ToDo: check to be sure data received are appropriately formatted
        const resultData = <object[]> result;
        if (resultData.length < 1) {
          reject(new functions.https.HttpsError('unavailable', 'User ' + userId + ' has no data'));
        } else {
          resolve(resultData[0]);
        }
      });
      p2.catch((error) => {
        console.log(error);
        reject(error);
      });
    });
  }

  recordImport(userId: string, records: any): Promise<object> {
    // add record_id to record
    records['record_id'] = userId;

    const options = {
      uri: this.config.uri,
      headers: this.headers,
      json: true, // Automatically parses the JSON string in the response
      form: {
        'token': this.config.token,
        'content': 'record',
        'format': 'json',
        'returnFormat': 'json',
        'type': 'flat',
        'data': JSON.stringify([records]),
      }
    };

    return new Promise<object>((resolve, reject) => {
      const p1 = request.post(options);
      const p2 = p1.then((result) => {
        // ToDo: check to be sure data received are appropriately formatted
        const resultData = <object[]> result;
        if (resultData.length < 1) {
          reject('Result not returned');
        } else {
          resolve(resultData[0]);
        }
      });
      p2.catch((error) => {
        // console.log(error);
        reject(error);
      });
    });
  }
}
