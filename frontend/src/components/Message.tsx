import * as React from "react";
import { Message } from "../model";
import { Paper } from "@material-ui/core";
import { EmbeddedChatForm } from "./EmbeddedChatForm";
import { MessagesService } from "../messagesService";

export const MessageComponent = (props: { messages: Message[] }) => {
  const renderMessages = () => {
    return props.messages.map(message => {
      const style =
        message.fromUser !== MessagesService.username
          ? {
              backgroundColor: "#66cdaa",
              alignSelf: "flexStart",
              marginRight: "auto",
              marginLeft: 10
            }
          : {
              backgroundColor: "#add8e6",
              alignSelf: "flexEnd",
              marginLeft: "auto",
              marginRight: 10
            };
      return (
        <div
          style={{
            maxWidth: "48%",
            padding: 8,
            borderRadius: 6,
            margin: 4,
            ...style
          }}
        >
          <div>{message.message}</div>
        </div>
      );
    });
  };

  let fromUser = props.messages[0].fromUser;
  fromUser =
    fromUser === MessagesService.username
      ? props.messages[0].toUsers[0]
      : fromUser;
  return (
    <Paper elevation={2} style={{ width: 400, height: 400, margin: 12 }}>
      <b style={{ margin: 20 }}>Chat with {fromUser}</b>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          overflowY: "scroll",
          maxHeight: 250,
          width: "100%",
          alignItems: "center"
        }}
      >
        {renderMessages()}
      </div>
      <EmbeddedChatForm to={props.messages[0].fromUser} />
    </Paper>
  );
};
