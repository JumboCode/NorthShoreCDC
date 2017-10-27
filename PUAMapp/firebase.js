import * as firebase from 'firebase';

// should go in a secret file- add credentisls before running the app
var config = {
    apiKey: "AIzaSyDbWmnZG4J3YM1qPIwrSpMM60eLM6TPHsA",
    authDomain: "puntourbanart.firebaseapp.com",
    databaseURL: "https://puntourbanart.firebaseio.com",
    projectId: "puntourbanart",
    storageBucket: "puntourbanart.appspot.com",
    messagingSenderId: "873188637889"
  };
firebase.initializeApp(config);

export default firebase;