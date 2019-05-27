import * as React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import { Messages } from "./Messages";
import { MessagesService } from "../messagesService";

export const ChatForm = (props: { username: string }) => {
  const { username } = props;
  const [message, setMessage] = useState("");
  const [to, setTo] = useState("");
  const submit = async () => {
    await MessagesService.writeMessage([to], message);
  };
  console.log(username);
  return (
    <>
      <div>Messages for {`${username}`}</div>
      <Messages />
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
    </>
  );
};
