import TextField from "@material-ui/core/TextField";
import * as React from "react";
import { useState } from "react";
import Button from "@material-ui/core/Button";
import { MessagesService } from "../messagesService";

export const LoginForm = (props: { setUsername: (u: string) => void }) => {
  const [username, setUsername] = useState("");
  const submit = async () => {
    const result = await MessagesService.login(username);
    if (result.status === 200) {
      //TODO this should all really be in the messages service
      const token = result.data.accessToken;
      MessagesService.token = token;
      MessagesService.username = username;
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      props.setUsername(username);
    }
  };
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <TextField
        id="outlined-username"
        label="Username"
        value={username}
        onChange={event => setUsername(event.target.value)}
        margin="normal"
        variant="outlined"
      />
      <Button onClick={submit}>Login</Button>
    </div>
  );
};
