import * as firebase from 'firebase';

// should go in a secret file- add credentisls before running the app
const config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    storageBucket: "",
    messagingSenderId: ""
};
firebase.initializeApp(config);

export default firebase;