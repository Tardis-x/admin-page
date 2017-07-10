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

const speakersReducer = (state, action) => {
  switch (action.type) {
    case CREATE_SPEAKER:
      return Object.assign({}, state, { speakerCreating: true });

    case CREATE_SPEAKER_SUCCESS: {
      const key = action.data.key;

      window.history.pushState({}, null, `/speakers/${key}`);
      window.dispatchEvent(new CustomEvent('location-changed'));

      return Object.assign({}, state, {
        speakerCreating: false,
      });
    }

    case FETCH_SPEAKERS:
      return Object.assign({}, state, { speakersFetching: true });

    case FETCH_SPEAKERS_SUCCESS:
      const speakers = Object.keys(action.data)
        .map(key => Object.assign({}, action.data[key], { $key: key }) );

      return Object.assign({}, state, { speakers });

    case FETCH_SPEAKER:
      return Object.assign({}, state, { speakerFetching: true });

    case FETCH_SPEAKER_SUCCESS: {
      const speaker = action.data;

      return Object.assign({}, state, {
        speaker,
        speakerFetching: false,
      });
    }

    case UPDATE_SPEAKER:
      return Object.assign({}, state, { speakerUpdating: true });

    case UPDATE_SPEAKER_SUCCESS: {
      const speaker = action.data;
      return Object.assign({}, state, {
        speaker,
        speakerUpdating: false,
      });
    }

    case UPLOAD_SPEAKER_PHOTO:
      return Object.assign({}, state, { speakerPhotoUploading: true });

    case UPLOAD_SPEAKER_PHOTO_FAILURE:
      return Object.assign({}, state, { speakerPhotoUploading: false });

    case UPLOAD_SPEAKER_PHOTO_SUCCESS: {
      const { photoUrl, photo } = action.data;
      const speaker = Object.assign({}, state.speaker, { photo, photoUrl });
      return Object.assign({}, state, {
        speaker,
        speakerPhotoUploading: false
      });
    }

    default:
      return state;
  }
};
