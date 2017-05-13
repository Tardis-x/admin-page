const organizationsReducer = (state, action) => {
  switch (action.type) {
    case FETCH_ORGANIZATIONS_SUCCESS:
      const organizations = Object.keys(action.data)
        .map(key => Object.assign({}, action.data[key], { $key: key }) );

      return Object.assign({}, state, { organizations });

    case FETCH_ORGANIZATION:
      return state;

    case CREATE_ORGANIZATION_SUCCESS:
    case FETCH_ORGANIZATION_SUCCESS:
    case UPDATE_ORGANIZATION_SUCCESS:
      const organization = action.data;
      return Object.assign({}, state, { organization });

    default:
      return state;
  }
};