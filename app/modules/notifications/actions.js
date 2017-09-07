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

const sendFailure = payload => ({ type: SEND_FAILURE, payload });

const sendSuccess = payload => ({ type: SEND_SUCCESS, payload });

export {
  send,
  sendFailure,
  sendSuccess,
}
