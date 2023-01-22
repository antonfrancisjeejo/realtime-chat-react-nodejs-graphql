import React, { useEffect, useState } from "react";
import Chat from "./Pages/Chat/Chat";
import Home from "./Pages/Home/Home";
import { v4 as uuid } from "uuid";

const App = () => {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState(uuid());
  const [startChat, setStartChat] = useState(false);

  useEffect(() => {
    if (!startChat) {
      const data = JSON.parse(sessionStorage.getItem("user"));
      if (data) {
        setUserName(data.userName);
        setUserId(data.id);
        setStartChat(true);
      }
    }
  }, []);

  console.log(userName, userId);

  if (startChat) {
    return <Chat userName={userName} id={userId} />;
  }

  return (
    <Home
      userName={userName}
      setUserName={setUserName}
      setStartChat={setStartChat}
      userId={userId}
    />
  );
};

export default App;
