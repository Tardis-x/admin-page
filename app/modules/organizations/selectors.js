import { createSelector } from 'reselect';

const selectDomain = () => state => state.organizations;

const selectOrganization = createSelector(
  selectDomain(),
  substate => substate.organization
);

const selectOrganizations = createSelector(
  selectDomain(),
  substate => substate.organizations
);

export { 
  selectOrganization,
  selectOrganizations,
};
