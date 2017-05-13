const createOrganizationSuccess = (d) => ({
  type: CREATE_ORGANIZATION_SUCCESS,
  data: d,
});

const createOrganizationFailure = (error) => ({
  type: CREATE_ORGANIZATION_FAILURE,
  data: error,
});


const organizationsActions = {
  createOrganization: (data) => {
    firebase.database()
      .ref(`/organizations`)
      .push(data)
      .then(d => store.dispatch(createOrganizationSuccess(d)))
      .catch(error => store.dispatch(createOrganizationFailure(error)));
  },
  fetchOrganizations: () => {
    firebase.database().ref('/organizations').once('value', snapshot => {
      store.dispatch({
        type: FETCH_ORGANIZATIONS_SUCCESS,
        data: snapshot.val()
      });
    });
  },
  fetchOrganization: (key) => {
    firebase.database().ref(`/organizations/${key}`).once('value', snapshot => {
      store.dispatch({
        type: FETCH_ORGANIZATION_SUCCESS,
        data: snapshot.val()
      });
    });
  },
  updateOrganization: (key, data) => {
    firebase.database().ref(`/organizations/${key}`).set(data);
    speakerActions.fetchSpeaker(key);
  },
  uploadOrganizationLogo: (key, file) => {
    console.log('Uploading fileName', file.name);

    const timestamp = `${Date.now()}${new Date().getUTCMilliseconds()}`;

    const storageRef = firebase.storage().ref('/images/organizations/');
    const metadata = {
      contentType: file.type,
      customMetadata: {
        dbRef: `/organizations/${key}/logoUrl`,
      },
    };

    storageRef
      .child(file.name.replace(/^.*(\.[^.]*)$/, `${timestamp}_original$1`))
      .put(file, metadata)
      .then(snapshot => {
        const url = snapshot.downloadURL;
        store.dispatch(organizationsActions.uploadOrganizationLogoSuccess({ url }));
      })
      .catch(error => {
        console.error('Upload failed:', error);
        store.dispatch(organizationsActions.uploadOrganizationLogoFailure(error));
      });
  },
  uploadOrganizationLogoFailure: (error) => ({
    type: UPLOAD_ORGANIZATION_LOGO_FAILURE,
    data: error,
  }),
  uploadOrganizationLogoSuccess: (data) => ({
    type: UPLOAD_ORGANIZATION_LOGO_SUCCESS,
    data,
  }),
};
