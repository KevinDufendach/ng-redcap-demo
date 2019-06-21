import * as functions from 'firebase-functions';
// import * as admin from 'firebase-admin';
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

