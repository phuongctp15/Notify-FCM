importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyDxAMzm00MDlx3IBtyRO4s0aFLrJfHT1ak",
  authDomain: "medipro-datn.firebaseapp.com",
  projectId: "medipro-datn",
  storageBucket: "medipro-datn.appspot.com",
  messagingSenderId: "608484264433",
  appId: "1:608484264433:web:d7f50abad415d8fdeb9c50",
  measurementId: "G-M1FH0YTMY5",
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message:", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    image: payload.notification.image,
  };

  // eslint-disable-next-line no-restricted-globals
  self.registration.showNotification(notificationTitle, notificationOptions);
});
