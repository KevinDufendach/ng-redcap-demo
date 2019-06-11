import * as functions from 'firebase-functions';
import * as request from 'request-promise-native';
import * as cfg from './config';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
export const getTestData = functions.https.onRequest((req, resp) => {
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
  p2.catch( (error) => {
    console.log(error);
    resp.status(500).send(error);
  });
});
