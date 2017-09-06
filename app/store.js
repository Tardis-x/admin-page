import PolymerRedux from 'polymer-redux/src';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { reducer as authReducer } from 'modules/auth';
import { reducer as organizationsReducer } from 'modules/organizations';

const initialState = {
  speakers: {
    speakers: [],
    speakersFetching: false,
    speaker: null,
    speakerFetching: false,
  },
};

const reducer = (state = {}, action) => ({
  auth: authReducer(state.auth, action),
  // speakers: speakersReducer(state.speakers, action),
  organizations: organizationsReducer(state.organizations, action),
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(
  applyMiddleware(thunk)
));

const ReduxMixin = PolymerRedux(store);
export default ReduxMixin;
