// // const organizationsActions = {
// //   createOrganization: (data) => {
// //     firebase.database()
// //       .ref(`/organizations`)
// //       .push(data)
// //       .then(d => {
// //         console.log('created', d);
// //       })
// //       .catch(error => {
// //         console.log(error);
// //       });
// // //      speakerActions.fetchSpeaker(key);
// //   },
// //   fetchOrganizations: () => {
// //     firebase.database().ref('/organizations').once('value', snapshot => {
// //       store.dispatch({
// //         type: 'FETCH_ORGANIZATIONS_SUCCESS',
// //         data: snapshot.val()
// //       });
// //     });
// //   },
// //   fetchOrganization: (key) => {
// //     firebase.database().ref(`/organizations/${key}`).once('value', snapshot => {
// //       store.dispatch({
// //         type: 'FETCH_ORGANIZATION_SUCCESS',
// //         data: snapshot.val()
// //       });
// //     });
// //   },
// //   updateOrganization: (key, data) => {
// //     firebase.database().ref(`/organizations/${key}`).set(data);
// //     speakerActions.fetchSpeaker(key);
// //   },
// // };
//
// const createOrganization = (data) => {
//
// };
//
// const createOrganizationFailure = (err) => {
//
// };
//
// const createOrganizationSuccess = (data) => {
//
// };
//
// const fetchOrganizations = () => {
//
// };
//
// const fetchOrganizationsFailure = () => {
//
// };
//
// const fetchOrganizationsSuccess = () => {
//
// };
//
// export {
//   createOrganization,
//   createOrganizationFailure,
//   createOrganizationSuccess,
//   fetchOrganizations,
//   fetchOrganizationsFailure,
//   fetchOrganizationsSuccess,
// }

const createOrganizationSuccess = (d) => ({
  type: CREATE_ORGANIZATION_SUCCESS,
  data: d,
});

const createOrganizationFailure = (error) => ({
  type: CREATE_ORGANIZATION_FAILURE,
  data: error,
});


const organizationsActions = {
  createOrganization: (data) => {
    firebase.database()
      .ref(`/organizations`)
      .push(data)
      .then(d => store.dispatch(createOrganizationSuccess(d)))
      .catch(error => store.dispatch(createOrganizationFailure(error)));
  },
  fetchOrganizations: () => {
    firebase.database().ref('/organizations').once('value', snapshot => {
      store.dispatch({
        type: FETCH_ORGANIZATIONS_SUCCESS,
        data: snapshot.val()
      });
    });
  },
  fetchOrganization: (key) => {
    firebase.database().ref(`/organizations/${key}`).once('value', snapshot => {
      store.dispatch({
        type: FETCH_ORGANIZATION_SUCCESS,
        data: snapshot.val()
      });
    });
  },
  updateOrganization: (key, data) => {
    firebase.database().ref(`/organizations/${key}`).set(data);
    speakerActions.fetchSpeaker(key);
  },
  uploadOrganizationLogo: (key, file) => {
    console.log('fileName', file.name);
  }
};
