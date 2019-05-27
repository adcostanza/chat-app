import { useEffect, useState } from "react";
import { Message } from "../model";
import { MessagesService } from "../messagesService";
import * as React from "react";

export const Messages = () => {
  const [messages, setMessages] = useState([] as Message[]);
  const getMessages = async () => {
    return await MessagesService.getMessages();
  };
  useEffect(() => {
    setInterval(() => {
      getMessages().then(messages => {
        console.log(messages);
        setMessages(messages);
      });
    }, 1000);
  }, []);
  // setInterval(() => {
  //   getMessages().then(messages => {
  //     setMessages(messages);
  //   });
  // }, 1000);
  return (
    <>
      {messages.map(message => {
        return (
          <div>
            {message.fromUser}: {message.message}
          </div>
        );
      })}
    </>
  );
};
