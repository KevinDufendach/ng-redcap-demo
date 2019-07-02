# Installation

This is a WORK IN PROGRESS.

ng-REDCap is meant to provide an interface to [REDCap](https://projectredcap.org/).

ng-REDCap uses Firebase for authentication. Users are assumed to have access to their own data but will not be able to access others' data.

An example of the Firebase functions setup is available at the GitHub repo https://github.com/KevinDufendach/ng-redcap-demo.

## Steps

```console
# ~/
# Install Dependencies (angular and firebase)
$ npm install -g @angular/cli
$ ng new my-angular-redcap-project
$ cd my-angular-redcap-project

# ~/my-angular-redcap-project
$ npm install --save ng-redcap
```

### Firebase configuration:
Create a new Firebase app at https://console.firebase.google.com/

```console
# Install Firebase tools
$ npm install -g firebase-tools

# ~/my-angular-redcap-project/
$ firebase init
```

1. Select features: `(*) functions` and `(*) hosting`
2. Associate with your newly created Firebase project
3. Choose `TypeScript` as your language for cloud functions
4. `Yes` you want to use `TSLint`
5. `Yes` you want to install dependencies with npm
6. Set your public directory to `dist/[my-angular-redcap-project]`
7. Can configure as single page or multi-page based on your project's needs

### Create Firebase functions in the `/functions/src` directory

`/functions/src/index.ts`
```typescript
import * as functions from 'firebase-functions';
import {REDCapService} from './redcap-service';

function notLoggedIn(): Promise<object> {
  return new Promise((resolve, reject) => {
    reject(new functions.https.HttpsError('unauthenticated', 'User must be logged in'));
  })
}

export const getMetadata = functions.https.onCall((data, context) => {
  // check request is made by logged in user
  if (!context.auth) {
    console.log('Attempt to getMetadata when not logged in');

    return notLoggedIn();
  }

  const form = data.form || '';

  // Return promise from REDCap getMetadata class
  const rc = new REDCapService();
  return rc.getMetadata(form);
  // return rc.getTestMetaData(form);
});

export const getRecord = functions.https.onCall((data, context) => {
  // check request is made by logged in user
  if (!context.auth) {
    console.log('Attempt to getRecord when not logged in');

    return notLoggedIn();
  }

  const form = data.form || '';

  // Return promise from REDCap getMetadata class
  const rc = new REDCapService();
  return rc.getRecordExport(context.auth.uid, form);
});

export const submitFields = functions.https.onCall((data, context) => {
  // check request is made by logged in user
  if (!context.auth) {
    console.log('Attempt to setRecord when not logged in');

    return notLoggedIn();
  }

  // Return promise from REDCap getMetadata class
  const rc = new REDCapService();
  return rc.recordImport(context.auth.uid, data.records);
});
```

`/functions/src/redcap-service.ts`
```typescript
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
```

`/functions/src/config.ts`
```typescript
export const config = {
  uri: '', // TODO: Update REDCap API URI
  token: '' // TODO: Add API token from REDCap
};
```

Update the 'config.ts' file with the REDCap API URI and token, which you can get from your REDCap project. You may need to request API access from your REDCap adminsitrator, depending on the configuration at your institution. You should be able to find your API from the "API playground" in your REDCap project. It might look something like: `https://redcap.myinstitution.org/api/`


This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.0.
