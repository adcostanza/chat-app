import * as React from "react";
import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { MessagesService } from "../messagesService";

export const ChatForm = () => {
  const [message, setMessage] = useState("");
  const [to, setTo] = useState("");
  const submit = async () => {
    await MessagesService.writeMessage([to], message);
    setMessage("");
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
      }}
    >
      <h2>Send a new message:</h2>
      <TextField
        id="outlined-to"
        label="To"
        value={to}
        onChange={event => setTo(event.target.value)}
        margin="normal"
        variant="outlined"
      />

      <TextField
        id="outlined-message"
        label="Message"
        value={message}
        onChange={event => setMessage(event.target.value)}
        margin="normal"
        variant="outlined"
      />
      <Button onClick={submit}>Send Message</Button>
    </div>
  );
};
