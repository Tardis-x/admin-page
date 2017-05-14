const createOrganizationSuccess = (d) => ({
  type: CREATE_ORGANIZATION_SUCCESS,
  data: d,
});

const createOrganizationFailure = (error) => ({
  type: CREATE_ORGANIZATION_FAILURE,
  data: error,
});


const organizationsActions = {
  createOrganization: (data) => (dispatch) => {
    dispatch({ type: CREATE_ORGANIZATION });

    return firebase.database()
      .ref(`/organizations`)
      .push(data)
      .then(d => store.dispatch(createOrganizationSuccess(d)))
      .catch(error => store.dispatch(createOrganizationFailure(error)));
  },
  fetchOrganizations: () => (dispatch) => {
    dispatch({ type: FETCH_ORGANIZATIONS });

    return firebase.database().ref('/organizations').once('value', snapshot => {
      dispatch({
        type: FETCH_ORGANIZATIONS_SUCCESS,
        data: snapshot.val()
      });
    });
  },
  fetchOrganization: (key) => (dispatch) => {
    dispatch({ type: FETCH_ORGANIZATION });

    return firebase.database().ref(`/organizations/${key}`).once('value', snapshot => {
      dispatch({
        type: FETCH_ORGANIZATION_SUCCESS,
        data: snapshot.val()
      });
    });
  },
  updateOrganization: (key, data) => (dispatch) => {
    dispatch({ type: UPDATE_ORGANIZATION });

    firebase.database().ref(`/organizations/${key}`)
      .set(data)
      .then(d => {
        console.log(d);
        dispatch(organizationsActions.updateOrganizationSuccess(d));
        dispatch(speakerActions.fetchSpeaker(key));
      })
      .catch(error => {
        dispatch(organizationsActions.updateOrganizationFailure(error));
      });

  },
  updateOrganizationFailure: (error) => ({
    type: UPDATE_ORGANIZATION_FAILURE,
    data: error,
  }),
  updateOrganizationSuccess: (data) => {
    return {
      type: UPDATE_ORGANIZATION_SUCCESS,
      data,
    };
  },
  uploadOrganizationLogo: (key, file) => (dispatch) => {
    dispatch({ type: UPLOAD_ORGANIZATION_LOGO });

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
        dispatch(organizationsActions.uploadOrganizationLogoSuccess({ url }));
      })
      .catch(error => {
        console.error('Upload failed:', error);
        dispatch(organizationsActions.uploadOrganizationLogoFailure(error));
      });
  },
  uploadOrganizationLogoFailure: (error) => ({
    type: UPLOAD_ORGANIZATION_LOGO_FAILURE,
    data: error,
  }),
  uploadOrganizationLogoSuccess: (data) => {
    return {
      type: UPLOAD_ORGANIZATION_LOGO_SUCCESS,
      data,
    };
  },
};
