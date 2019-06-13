import * as functions from 'firebase-functions';
// import * as admin from 'firebase-admin';
import * as request from 'request-promise-native';
import * as cfg from './config';
import {Redcap} from './redcap';
import {REDCapFieldMetadata} from '../../projects/ng-redcap/src/lib/field';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
export const getTestData = functions.https.onRequest((_req, resp) => {
  const config = cfg.config;
  const options = {
    uri: config.uri,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    },
    json: true, // Automatically parses the JSON string in the response
    form: {
      'token': config.token,
      'content': 'project',
      'format': 'json',
      'returnFormat': 'json'
    }
  };

  const p1 = request.post(options);
  const p2 = p1.then((getResult) => {
    resp.send(getResult);
  });
  p2.catch((error) => {
    console.log(error);
    resp.status(500).send(error);
  });
});

export const getUserData = functions.https.onCall((data, context) => {
  // check request is made by logged in user
  if (!context.auth) {
    return 'user is not logged in';
  }

  console.log('user is logged in: ' + context.auth.uid);
  return ('user is logged in: ' + context.auth.uid);
});

export const getMetadata = functions.https.onCall((data, context) => {
  // check request is made by logged in user
  if (!context.auth) {
    return new Promise<REDCapFieldMetadata[]>((resolve, reject) => {
      reject(new functions.https.HttpsError('unauthenticated', 'User must be logged in'));
    });
  }

  console.log('user is logged in: ' + context.auth.uid);

  // Return promise from REDCap getMetadata class
  const rc = new Redcap();
  return rc.getMetadata('adolescent_preferences');
});
