

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
