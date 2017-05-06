'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// Init the user data in the Realtime Datastore when the accounts are created.
exports.initUserData = functions.auth.user().onCreate(event => {
  const { uid, email, displayName } = event.data;
  return admin.database().ref(`/users/${uid}`).set({
    email,
    displayName,
    rules: {
      speakers: false,
    },
  });
});
