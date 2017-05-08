'use strict';

const path = require('path');

const admin = require('firebase-admin');
const functions = require('firebase-functions');
const gcs = require('@google-cloud/storage')();
const spawn = require('child-process-promise').spawn;

admin.initializeApp(functions.config().firebase);

const getPublicUrl = (bucket, filename) => `https://storage.googleapis.com/${bucket}/${filename}`;

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

exports.resizeOrganizationLogo = functions.storage.object().onChange(event => {
  const { contentType, resourceState, metadata } = event.data;

// console.log(functions.config().firebase);

  // Exit if this is a move or deletion event.
  if (resourceState === 'not_exists') {
    console.log('This is a deletion event.');
    return;
  }

  // Exit if this is triggered on a file that is not an image.
  if (!contentType.startsWith('image/')) {
    console.log('This is not an image.');
    return;
  }

  const bucket = gcs.bucket(event.data.bucket);
  const filePath = event.data.name;
  const fileName = path.basename(filePath);

  // organization logo
  if (filePath.startsWith('images/organizations/') && /^(.*)_original(\.[^.]*)$/.test(fileName)) {
    const tempFilePath = `/tmp/${fileName}`;
    const newFilePath = filePath.replace(/^(.*)_original(\.[^.]*)$/, '$1$2');
    const dbRef = metadata.dbRef;

    return bucket.file(filePath)
      .download({ destination: tempFilePath })
      .then(() => console.log('Image downloaded locally to', tempFilePath))
      .then(() => spawn('convert', [tempFilePath, '-resize', 'x60>', tempFilePath]))
      .then(() => console.log('Image resized'))
      .then(() => spawn('convert', [tempFilePath, '-strip', '-interlace', 'Plane', '-quality', '85%', tempFilePath]))
      .then(() => console.log('Image optimized'))
      .then(() => bucket.upload(tempFilePath, { destination: newFilePath, metadata: { metadata: { dbRef } } }))
      .then(() => bucket.file(newFilePath).makePublic())
      .then(() => admin.database().ref(dbRef).set(getPublicUrl(event.data.bucket, newFilePath)));

        // .then(() => {
        //   console.log('Image downloaded locally to', tempFilePath);
        //   return spawn('convert', [tempFilePath, '-resize', 'x60>', tempFilePath])
        //     .then(() => spawn('convert', [tempFilePath, '-strip', '-interlace', 'Plane', '-quality', '85%', tempFilePath]))
        //     .then(() => {
        //       console.log('Thumbnail created at', tempFilePath);
        //
        //       return bucket.upload(tempFilePath, { destination: newFilePath });
        //     });
        // });

  }
});
