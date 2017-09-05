import * as firebase from 'firebase';

const provider = new firebase.auth.GoogleAuthProvider();

const authActions = {
  initListeners: () => (dispatch) => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch({
          type: 'SIGNIN_SUCCESS',
          data: user,
        });
      } else {
        dispatch({
          type: 'SIGNOUT_SUCCESS',
        });
      }
    });
  },
  signIn: () => (dispatch) => {
    firebase.auth().signInWithPopup(provider)
      .then(result => {
        dispatch({
          type: 'SIGNIN_SUCCESS',
          data: result.user,
        });
      })
      .catch(error => {
        dispatch({
          type: 'SIGNIN_FAILURE',
          data: error,
        });
      });
  },
  signOut: () => (dispatch) => {
    firebase.auth().signOut()
      .then(() => {
        this.getCurrentUser();
      })
      .catch(error => {
        dispatch({
          type: 'SIGNIN_FAILURE',
          data: error,
        });
      });
  },
};

export default authActions;
