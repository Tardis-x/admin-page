import {
  SEND,
  SEND_FAILURE,
  SEND_SUCCESS,
} from './constants';

const initialState = {
  sending: false,
  sendingError: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND:
      return Object.assign({}, state, {
        sending: true,
        sendingError: false,
      });

    case SEND_FAILURE:
      return Object.assign({}, state, {
        sending: false,
        sendingError: action.payload,
      });

    case SEND_SUCCESS:
      return Object.assign({}, state, {
        sending: false,
      });

    default:
      return state;
  }
};

export default reducer;
