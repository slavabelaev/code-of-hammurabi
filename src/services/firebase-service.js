import firebase from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyAVuuWJvH5o7saMgLqJxBSQh2IeX6dVbl4",
    authDomain: "code-of-hammurabi.firebaseapp.com",
    databaseURL: "https://code-of-hammurabi.firebaseio.com",
    projectId: "code-of-hammurabi",
    storageBucket: "code-of-hammurabi.appspot.com",
    messagingSenderId: "1031370616661",
    appId: "1:1031370616661:web:517f9efd1fa486b9"
};

const firebaseService = firebase.initializeApp(firebaseConfig);

export default firebaseService;
