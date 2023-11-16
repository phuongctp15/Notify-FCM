import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { fetchToken, onMessageListener } from "./firebaseConfig";

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
      console.log("payload for onMessageListener:", payload);
    })
    .catch((err) => console.log("Failed to received message: ", err));

  const onShowNotificationClicked = () => {
    setNotification({
      title: "Notification",
      body: "This is a test notification",
    });
    setShow(true);
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Push Notification using Firebase</h1>

      {isTokenFound && <h1> Notification permission enabled 👍🏻 </h1>}
      {!isTokenFound && <h1> Need notification permission ❗️ </h1>}
    </>
  );
}

export default App;
