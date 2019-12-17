// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/database";

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDYFFQIGJS0nGpYufxbo-mqCf9wgw4u5JU",
    authDomain: "chatapp-b9c04.firebaseapp.com",
    databaseURL: "https://chatapp-b9c04.firebaseio.com",
    projectId: "chatapp-b9c04",
    storageBucket: "chatapp-b9c04.appspot.com",
    messagingSenderId: "664076872278",
    appId: "1:664076872278:web:f7ec2595d5c6e3a93229f7"
  };
  // Initialize Firebase
  let firebaseApp = firebase.initializeApp(firebaseConfig);
  let firebaseAuth = firebaseApp.auth()
  let firebaseDb = firebaseApp.database()

export { firebaseAuth, firebaseDb }