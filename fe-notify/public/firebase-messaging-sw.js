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

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message:", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.data.icon,
  };

  // show Notification
  self.registration.showNotification(notificationTitle, notificationOptions);

  // Handle notification click event
  self.addEventListener("notificationclick", (event) => {
    const notification = event.notification;
    if (payload.data && payload.data.link) {
      console.log("Open URL CLient...");
      // Open the URL associated with the notification
      event.waitUntil(clients.openWindow(payload.data.link));
    } else {
      console.log("Link not found or not exist.");
    }

    notification.close();
  });
});
