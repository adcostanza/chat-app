import * as React from "react";
import { useEffect, useState } from "react";
import { Message } from "../model";
import { MessagesService } from "../messagesService";
import { MessageComponent } from "./Message";
import { UsernameContext } from "../app";

export const Messages = () => {
  const [messages, setMessages] = useState([] as Message[]);
  const groupedMessages = messages.reduce(
    (grouped, message) => {
      if (message.fromUser === MessagesService.username) {
        const to = message.toUsers[0];
        if (grouped[to]) {
          grouped[to].push(message);
        } else {
          grouped[message.toUsers[0]] = [message];
        }
      } else if (grouped[message.fromUser]) {
        grouped[message.fromUser].push(message);
      } else {
        grouped[message.fromUser] = [message];
      }
      return grouped;
    },
    {} as Record<string, Message[]>
  );
  const getMessages = async () => {
    return setMessages(await MessagesService.getMessages());
  };
  useEffect(() => {
    getMessages();
    setInterval(async () => {
      await getMessages();
    }, 1000);
  }, []);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        flexDirection: "row",
        flexWrap: "wrap"
      }}
    >
      {Object.keys(groupedMessages).map(fromUser => {
        return <MessageComponent messages={groupedMessages[fromUser]} />;
      })}
    </div>
  );
};
