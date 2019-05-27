import { TextField } from "@material-ui/core";
import * as React from "react";
import { useState } from "react";
import Button from "@material-ui/core/Button";
import { MessagesService } from "../messagesService";

export const LoginForm = (props: { setUsername: (u: string) => void }) => {
  const [username, setUsername] = useState("");
  const submit = async () => {
    const result = await MessagesService.login(username);
    if (result.status === 200) {
      MessagesService.token = result.data.accessToken;
      props.setUsername(username);
    }
  };
  return (
    <>
      <TextField
        id="outlined-username"
        label="Username"
        value={username}
        onChange={event => setUsername(event.target.value)}
        margin="normal"
        variant="outlined"
      />
      <Button onClick={submit}>Login</Button>
    </>
  );
};
