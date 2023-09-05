import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBgXfPd4HZDC9i3AS2dfyKoGCLoeIC2DQE",
  authDomain: "ccapp-25ef6.firebaseapp.com",
  databaseURL: "https://ccapp-25ef6-default-rtdb.firebaseio.com",
  projectId: "ccapp-25ef6",
  storageBucket: "ccapp-25ef6.appspot.com",
  messagingSenderId: "712157985451",
  appId: "1:712157985451:web:af311491010951518dd5ee"
};

const app = initializeApp(firebaseConfig);
export default app;