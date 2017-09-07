import { createSelector } from 'reselect';

const selectDomain = () => state => state.notifications;

const selectSending = createSelector(
  selectDomain(),
  substate => substate.sending
);

const selectSendingError = createSelector(
  selectDomain(),
  substate => substate.sendingError
);

export {
  selectSending,
  selectSendingError,
};
