import { useEffect, useState } from "react";
import reactLogo from "./assets/svg/react.svg";
import viteLogo from "./assets/svg/vite.svg";
import firebaseLogo from "./assets/images/firebase.png";
import "./App.css";
import { fetchToken, onMessageListener } from "./firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastToLink from "./ToastToLink";

const DEFAULT_NOTIFICATION = {
  title: "",
  body: "",
  icon: "",
};

function App() {
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState(DEFAULT_NOTIFICATION);
  const [isTokenFound, setTokenFound] = useState(false);

  useEffect(() => {
    fetchToken(setTokenFound);
  }, []);

  onMessageListener()
    .then((payload) => {
      setNotification(payload);
      setShow(true);
      if (payload && payload.fcmOptions && payload.fcmOptions.link) {
        toast.info(
          <ToastToLink
            link={payload.fcmOptions.link}
            title={payload.notification.title}
            body={payload.notification.body}
          />
        );
      }
      console.log("payload for onMessageListener:", payload);
    })
    .catch((err) => console.log("Failed to received message: ", err));

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://firebase.google.com" target="_blank">
          <img src={firebaseLogo} className="logo react" alt="Firebase logo" />
        </a>
      </div>
      <h1>Push Notifications with Firebase & Toastify</h1>
      {isTokenFound && <h1> Notification is allowed on this browser 🔔</h1>}
      {!isTokenFound && (
        <h1> This browser needs notification permissions❗️ </h1>
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
