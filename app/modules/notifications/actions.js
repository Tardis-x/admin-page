import * as firebase from 'firebase';

import {
  SEND,
  SEND_FAILURE,
  SEND_SUCCESS,
} from './constants';

const send = (data) => (dispatch) => {
  dispatch({ type: SEND });

  return firebase.database()
    .ref(`/notifications/messages`)
    .push(data)
    .then(d => dispatch(sendSuccess(d)))
    .catch(error => dispatch(sendFailure(error)));
};

const sendFailure = error => ({ type: SEND_FAILURE, payload: error });

const sendSuccess = user => ({ type: SEND_SUCCESS, payload: user });

export {
  send,
  sendFailure,
  sendSuccess,
}
