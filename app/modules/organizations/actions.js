import * as firebase from 'firebase';

import {
  CREATE_ORGANIZATION,
  CREATE_ORGANIZATION_FAILURE,
  CREATE_ORGANIZATION_SUCCESS,
  FETCH_ORGANIZATION,
  FETCH_ORGANIZATION_FAILURE,
  FETCH_ORGANIZATION_SUCCESS,
  FETCH_ORGANIZATIONS,
  FETCH_ORGANIZATIONS_FAILURE,
  FETCH_ORGANIZATIONS_SUCCESS,
  UPLOAD_LOGO,
  UPLOAD_LOGO_FAILURE,
  UPLOAD_LOGO_SUCCESS,
  UPDATE_ORGANIZATION,
  UPDATE_ORGANIZATION_FAILURE,
  UPDATE_ORGANIZATION_SUCCESS,
} from './constants';

const createOrganization = (data) => (dispatch) => {
  dispatch({ type: CREATE_ORGANIZATION });

  return firebase.database()
    .ref(`/organizations`)
    .push(data)
    .then(d => dispatch(createOrganizationSuccess(d)))
    .catch(error => dispatch(createOrganizationFailure(error)));
};

const createOrganizationFailure = payload => ({ type: CREATE_ORGANIZATION_FAILURE, payload });

const createOrganizationSuccess = payload => ({ type: CREATE_ORGANIZATION_SUCCESS, payload });

const fetchOrganizations = () => (dispatch) => {
  dispatch({ type: FETCH_ORGANIZATIONS });

  firebase.database().ref('/organizations').on('value', snapshot => {
    dispatch(fetchOrganizationsSuccess(snapshot.val()));
  });
};

const fetchOrganizationsFailure = payload => ({ type: FETCH_ORGANIZATIONs_FAILURE, payload });

const fetchOrganizationsSuccess = payload => ({ type: FETCH_ORGANIZATIONS_SUCCESS, payload });

const fetchOrganization = (key) => (dispatch) => {
  dispatch({ type: FETCH_ORGANIZATION });

  return firebase.database().ref(`/organizations/${key}`).once('value', snapshot => {
    dispatch(fetchOrganizationSuccess(snapshot.val()));
  });
};

const fetchOrganizationFailure = payload => ({ type: FETCH_ORGANIZATION_FAILURE, payload });

const fetchOrganizationSuccess = payload => ({ type: FETCH_ORGANIZATION_SUCCESS, payload });

const updateOrganization = (key, data) => (dispatch) => {
  dispatch({ type: UPDATE_ORGANIZATION });

  firebase.database().ref(`/organizations/${key}`)
    .set(data)
    .then(d => {
      dispatch(oupdateOrganizationSuccess(d));
      dispatch(fetchOrganization(key));
    })
    .catch(error => {
      dispatch(updateOrganizationFailure(error));
    });
};

const updateOrganizationFailure = payload => ({ type: UPDATE_ORGANIZATION_FAILURE, payload });

const updateOrganizationSuccess = payload => ({ type: UPDATE_ORGANIZATION_SUCCESS, payload });
  
const uploadLogo = (key, file) => (dispatch) => {
  dispatch({ type: UPLOAD_LOGO });

  const timestamp = `${Date.now()}${new Date().getUTCMilliseconds()}`;

  const logo = 'images/organizations/' + file.name.replace(/^.*(\.[^.]*)$/, `${timestamp}$1`)
  const storageRef = firebase.storage().ref(logo);

  storageRef
    .put(file)
    .then(snapshot => {
      const logoUrl = snapshot.downloadURL;
      dispatch(uploadLogoSuccess({ logo, logoUrl }));
    })
    .catch(error => {
      console.error('Upload failed:', error);
      dispatch(uploadLogoFailure(error));
    });
};

const uploadLogoFailure = payload => ({ type: UPLOAD_LOGO_FAILURE, payload });

const uploadLogoSuccess = payload => ({ type: UPLOAD_LOGO_SUCCESS, payload });

export {
  createOrganization,
  createOrganizationFailure,
  createOrganizationSuccess,
  fetchOrganization,
  fetchOrganizationFailure,
  fetchOrganizationSuccess,
  fetchOrganizations,
  fetchOrganizationsFailure,
  fetchOrganizationsSuccess,
  updateOrganization,
  updateOrganizationFailure,
  updateOrganizationSuccess,
  uploadLogo,
  uploadLogoFailure,
  uploadLogoSuccess,
}
