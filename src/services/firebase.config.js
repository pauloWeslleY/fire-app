import { initializeApp } from "firebase/app";

const firebaseConfig = () => ({
  apiKey: "AIzaSyC21fdR50T_Rw23UKtnwdc-25Ko5c1_9vU",
  authDomain: "teste-28a5a.firebaseapp.com",
  databaseURL: "https://teste-28a5a-default-rtdb.firebaseio.com",
  projectId: "teste-28a5a",
  storageBucket: "teste-28a5a.firebasestorage.app",
  messagingSenderId: "116331892405",
  appId: "1:116331892405:web:0ff3207d1bd731b1e638fc",
});

export default class FirebaseInitApp {
  constructor() {
    this.initializeApp();
  }

  initializeApp() {
    const app = initializeApp(firebaseConfig());
    return app;
  }
}
