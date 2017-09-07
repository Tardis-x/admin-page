import PolymerRedux from 'polymer-redux/src';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { reducer as authReducer } from 'modules/auth';
import { reducer as notificationsReducer } from 'modules/notifications';
import { reducer as organizationsReducer } from 'modules/organizations';

const initialState = {
  speakers: {
    speakers: [],
    speakersFetching: false,
    speaker: null,
    speakerFetching: false,
  },
};

const reducer = combineReducers({
  auth: authReducer,
  notifications: notificationsReducer,
  organizations: organizationsReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(
  applyMiddleware(thunk)
));

const ReduxMixin = PolymerRedux(store);
export default ReduxMixin;
