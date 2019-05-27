import * as React from "react";
import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { MessagesService } from "../messagesService";

export const EmbeddedChatForm = (props: { to: string }) => {
  const [message, setMessage] = useState("");
  const submit = async () => {
    await MessagesService.writeMessage([props.to], message);
    setMessage("");
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        alignSelf: "flexEnd"
      }}
    >
      <TextField
        id="outlined-message"
        label="Message"
        value={message}
        onChange={event => setMessage(event.target.value)}
        margin="normal"
        variant="outlined"
      />
      <Button onClick={submit}>Send Message to {props.to}</Button>
    </div>
  );
};
