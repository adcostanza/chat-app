import { TextField } from "@material-ui/core";
import * as React from "react";
import { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import { AppState } from "../app";
import { MessagesService } from "../messagesService";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const context = useContext(AppState);
  const submit = async () => {
    const result = await MessagesService.login(username);
    console.log(JSON.stringify(result, null, "\t"));
    context.setUsername(username);
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
