import React from "react";
import { useSubscription, gql } from "@apollo/client";
import styles from "./Messages.module.css";

const GET_MESSAGES = gql`
  subscription {
    messages {
      id
      userId
      content
      user
    }
  }
`;

const Messages = ({ uId }) => {
  const { data } = useSubscription(GET_MESSAGES);
  if (!data) {
    return null;
  }

  return (
    <>
      {data.messages.map(({ id, userId, user: messageUser, content }) => (
        <div
          key={id}
          style={{
            display: "flex",
            justifyContent: userId === uId ? "flex-end" : "flex-start",
            paddingBottom: "1em",
          }}
        >
          {userId !== uId && (
            <div className={styles.userAvatar}>
              {messageUser.slice(0, 1).toUpperCase()}
            </div>
          )}
          <div>
            <h5>{messageUser}</h5>
            <p
              style={{
                background: userId === uId ? "blue" : "#e5e6ea",
                color: userId === uId ? "white" : "black",
                padding: "1em",
                marginTop: 5,
              }}
              className={styles.message}
            >
              {content}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Messages;
