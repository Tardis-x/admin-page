const organizationsReducer = (state, action) => {
  switch (action.type) {
    case FETCH_ORGANIZATIONS_SUCCESS: {
      const organizations = Object.keys(action.data)
        .map(key => Object.assign({}, action.data[key], {$key: key}));

      return Object.assign({}, state, {organizations});
    }

    case FETCH_ORGANIZATION:
      return state;

    case CREATE_ORGANIZATION_SUCCESS: {
      const key = action.data.key;

      window.history.pushState({}, null, `/organizations/${key}`);
      window.dispatchEvent(new CustomEvent('location-changed'));

      return state;
    }

    case FETCH_ORGANIZATION_SUCCESS:
    case UPDATE_ORGANIZATION_SUCCESS: {
      const organization = action.data;
      return Object.assign({}, state, { organization });
    }

    case UPLOAD_ORGANIZATION_LOGO:
      return Object.assign({}, state, { organizationLogoUploading: true });

    case UPLOAD_ORGANIZATION_LOGO_FAILURE:
      return Object.assign({}, state, { organizationLogoUploading: false });

    case UPLOAD_ORGANIZATION_LOGO_SUCCESS: {
      const organization = Object.assign({}, state.organization, { logoUrl: action.data.url });

      return Object.assign({}, state, {
        organization,
        organizationLogoUploading: false
      });
    }

    default:
      return state;
  }
};
