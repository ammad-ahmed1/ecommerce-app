// // import { firebaseConfig } from "../src/firebase/config";

// // public/firebase-messaging-sw.js
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js"
);
const firebaseConfig = {
  apiKey: "AIzaSyCBLTOg_kAtozDLP5DsBsLcmlU4TM-5has",
  authDomain: "shop-from-home-d5c19.firebaseapp.com",
  projectId: "shop-from-home-d5c19",
  storageBucket: "shop-from-home-d5c19.appspot.com",
  messagingSenderId: "884923807611",
  appId: "1:884923807611:web:74b64aa2e8d9299266efde",
};
// console.log(firebaseConfig);
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
// Customize background notification handling here
messaging.onBackgroundMessage((payload) => {
  console.log("Background Message:", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
