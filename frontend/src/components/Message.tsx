import * as React from "react";
import { Message } from "../model";
import { Paper } from "@material-ui/core";
import { EmbeddedChatForm } from "./EmbeddedChatForm";
import { MessagesService } from "../messagesService";

export const MessageComponent = (props: { messages: Message[] }) => {
  return (
    <Paper elevation={2} style={{ width: 400, height: 400, margin: 12 }}>
      <b style={{ margin: 20 }}>Chat with {props.messages[0].fromUser}</b>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          overflowY: "scroll",
          maxHeight: 250,
          width: "100%",
          justifyContent: "flexStart"
        }}
      >
        {props.messages.map(message => {
          const style =
            message.fromUser !== MessagesService.username
              ? { backgroundColor: "#66cdaa", alignSelf: "flexStart" }
              : { backgroundColor: "#add8e6", alignSelf: "flexEnd" };
          return (
            <div
              style={{
                maxWidth: "48%",
                padding: 6,
                borderRadius: 6,
                margin: 4,
                wordWrap: "normal",
                ...style
              }}
            >
              {message.message}
            </div>
          );
        })}
      </div>
      <EmbeddedChatForm to={props.messages[0].toUsers[0]} />
    </Paper>
  );
};
