// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// import { getAnalytics } from "firebase/analytics";

const vapidKey =
  "BJdim9CVNu4XcKGzssdbg7thVU4tsWLh2LX0E-91zw4YMi4_YRM5Jr26DYLI2o2Kz--bZVQMUm3wypqddTLRMAc";

const firebaseConfig = {
  apiKey: "AIzaSyDxAMzm00MDlx3IBtyRO4s0aFLrJfHT1ak",
  authDomain: "medipro-datn.firebaseapp.com",
  projectId: "medipro-datn",
  storageBucket: "medipro-datn.appspot.com",
  messagingSenderId: "608484264433",
  appId: "1:608484264433:web:d7f50abad415d8fdeb9c50",
  measurementId: "G-M1FH0YTMY5",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(firebaseApp);

export const fetchToken = (setTokenFound) => {
  return getToken(messaging, {
    vapidKey,
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        setTokenFound(true);
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        setTokenFound(false);
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
