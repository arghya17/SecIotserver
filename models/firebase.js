const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs } = require("firebase/firestore");
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAn0kBvnVv_MNGKoRbbTVukCYcM22yBl3M",
  authDomain: "seciot-8cc45.firebaseapp.com",
  projectId: "seciot-8cc45",
  storageBucket: "seciot-8cc45.appspot.com",
  messagingSenderId: "503053249058",
  appId: "1:503053249058:web:479868a25f0212e077b87b",
  measurementId: "G-2YHWQCCDF2",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
module.exports = db;
