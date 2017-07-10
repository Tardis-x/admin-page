const organizationsActions = {
  createOrganization: (data) => (dispatch) => {
    dispatch({ type: CREATE_ORGANIZATION });

    return firebase.database()
      .ref(`/organizations`)
      .push(data)
      .then(d => dispatch(organizationsActions.createOrganizationSuccess(d)))
      .catch(error => dispatch(organizationsActions.createOrganizationFailure(error)));
  },
  createOrganizationFailure: (error) => ({
    type: CREATE_ORGANIZATION_FAILURE,
    data: error,
  }),
  createOrganizationSuccess: (data) => ({
    type: CREATE_ORGANIZATION_SUCCESS,
    data,
  }),
  fetchOrganizations: () => (dispatch) => {
    dispatch({ type: FETCH_ORGANIZATIONS });

    return firebase.database().ref('/organizations').on('value', snapshot => {
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
        dispatch(organizationsActions.updateOrganizationSuccess(d));
        dispatch(organizationsActions.fetchOrganization(key));
      })
      .catch(error => {
        dispatch(organizationsActions.updateOrganizationFailure(error));
      });
  },
  updateOrganizationFailure: (error) => ({
    type: UPDATE_ORGANIZATION_FAILURE,
    data: error,
  }),
  updateOrganizationSuccess: (data) => ({
    type: UPDATE_ORGANIZATION_SUCCESS,
    data,
  }),
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

const speakersActions = {
  createSpeaker: (data) => (dispatch) => {
    dispatch({ type: CREATE_SPEAKER });

    return firebase.database()
      .ref(`/speakers`)
      .push(data)
      .then(d => dispatch(speakersActions.createSpeakerSuccess(d)))
      .catch(error => dispatch(speakersActions.createSpeakerFailure(error)));
  },
  createSpeakerFailure: (error) => ({
    type: CREATE_SPEAKER_FAILURE,
    data: error,
  }),
  createSpeakerSuccess: (data) => ({
    type: CREATE_SPEAKER_SUCCESS,
    data,
  }),
  fetchSpeakers: () => (dispatch) => {
    dispatch({ type: FETCH_SPEAKERS });

    return firebase.database()
      .ref('/speakers')
      .on('value', snapshot => dispatch(speakersActions.fetchSpeakersSuccess(snapshot.val())));
  },
  fetchSpeakersSuccess: (data) => ({
    type: FETCH_SPEAKERS_SUCCESS,
    data,
  }),
  fetchSpeaker: (key) => (dispatch) => {
    dispatch({ type: FETCH_SPEAKER });

    return firebase.database()
      .ref(`/speakers/${key}`)
      .once('value', snapshot => dispatch(speakersActions.fetchSpeakerSuccess(snapshot.val())));
  },
  fetchSpeakerSuccess: (data) => ({
    type: FETCH_SPEAKER_SUCCESS,
    data,
  }),
  updateSpeaker: (key, data) => (dispatch) => {
    dispatch({ type: UPDATE_SPEAKER });

    firebase.database().ref(`/speakers/${key}`)
      .set(data)
      .then(d => {
        dispatch(speakersActions.updateSpeakerSuccess(d));
        dispatch(speakersActions.fetchSpeaker(key));
      })
      .catch(error => {
        dispatch(speakersActions.updateSpeakerFailure(error));
      });
  },
  updateSpeakerFailure: (error) => ({
    type: UPDATE_SPEAKER_FAILURE,
    data: error,
  }),
  updateSpeakerSuccess: (data) => ({
    type: UPDATE_SPEAKER_SUCCESS,
    data,
  }),
  uploadSpeakerPhoto: (key, file) => (dispatch) => {
    dispatch({ type: UPLOAD_SPEAKER_PHOTO });
    const timestamp = `${Date.now()}${new Date().getUTCMilliseconds()}`;

    const photo = 'images/speakers/' + file.name.replace(/^.*(\.[^.]*)$/, `${timestamp}$1`)
    const storageRef = firebase.storage().ref(photo);

    storageRef
      .put(file)
      .then(snapshot => {
        const photoUrl = snapshot.downloadURL;
        dispatch(speakersActions.uploadSpeakerLogoSuccess({ photoUrl, photo }));
      })
      .catch(error => {
        console.error('Upload failed:', error);
        dispatch(speakersActions.uploadSpeakerLogoFailure(error));
      });
  },
  uploadSpeakerLogoFailure: (error) => ({
    type: UPLOAD_SPEAKER_PHOTO_FAILURE,
    data: error,
  }),
  uploadSpeakerLogoSuccess: (data) => {
    return {
      type: UPLOAD_SPEAKER_PHOTO_SUCCESS,
      data,
    };
  },
};
