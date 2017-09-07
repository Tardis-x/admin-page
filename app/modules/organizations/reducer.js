import {
  CREATE_ORGANIZATION_SUCCESS,
  FETCH_ORGANIZATION,
  FETCH_ORGANIZATION_SUCCESS,
  UPDATE_ORGANIZATION_SUCCESS,
  UPLOAD_LOGO,
  UPLOAD_LOGO_FAILURE,
  UPLOAD_LOGO_SUCCESS,
  FETCH_ORGANIZATIONS_SUCCESS,
} from './constants';

const initialState = {
  organization: null,
  organizationLogoUploading: false,
  organizations: [],
  organizationsError: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORGANIZATION_SUCCESS: {
      const key = action.payload.key;

      window.history.pushState({}, null, `/organizations/${key}`);
      window.dispatchEvent(new CustomEvent('location-changed'));

      return state;
    }

    case FETCH_ORGANIZATIONS_SUCCESS: {
      if (action.payload) {
        const organizations = Object.keys(action.payload)
          .map(key => Object.assign({}, action.payload[key], { $key: key }));

        return Object.assign({}, state, { organizations });  
      } else {
        return Object.assign({}, state, { organizations: [] });
      }

      // const organizations = Object.keys(action.data)
      //   .map(key => Object.assign({}, action.data[key], {$key: key}));

      // return Object.assign({}, state, {organizations});
    }

    case FETCH_ORGANIZATION:
      return state;

    

    case FETCH_ORGANIZATION_SUCCESS:
    case UPDATE_ORGANIZATION_SUCCESS: {
      const organization = action.payload;
      return Object.assign({}, state, { organization });
    }

    case UPLOAD_LOGO:
      return Object.assign({}, state, { organizationLogoUploading: true });

    case UPLOAD_LOGO_FAILURE:
      return Object.assign({}, state, { organizationLogoUploading: false });

    case UPLOAD_LOGO_SUCCESS: {
      const { logo, logoUrl } = action.payload;
      const organization = Object.assign({}, state.organization, { logo, logoUrl });

      return Object.assign({}, state, {
        organization,
        organizationLogoUploading: false
      });
    }

    default:
      return state;
  }
};

export default reducer;
