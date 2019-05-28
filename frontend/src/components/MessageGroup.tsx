import * as React from "react";
import { Message } from "../model";
import { Paper } from "@material-ui/core";
import { EmbeddedChatForm } from "./EmbeddedChatForm";
import { MessagesService } from "../messagesService";

export const MessageGroup = (props: { messages: Message[] }) => {
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
    <Paper
      elevation={2}
      style={{
        width: 400,
        height: 400,
        margin: 12,
        display: "flex",
        flexDirection: "column"
      }}
    >
      <h3 style={{ margin: 0, padding: 12 }}>Chat with {fromUser}</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          overflowY: "scroll",
          height: 230,
          width: "100%",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
          paddingTop: 6,
          paddingBottom: 6
        }}
      >
        {renderMessages()}
      </div>
      <EmbeddedChatForm to={fromUser} />
    </Paper>
  );
};
