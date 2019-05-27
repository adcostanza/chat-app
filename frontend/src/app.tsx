import * as React from "react";
import { Paper } from "@material-ui/core";
import { LoginForm } from "./components/LoginForm";
import { useState } from "react";
import { ChatForm } from "./components/ChatForm";
export const App = () => {
  const [username, setUsername] = useState("");
  return (
    <Paper
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        flexDirection: "column"
      }}
    >
      {username == null || username == "" ? (
        <LoginForm setUsername={(u: string) => setUsername(u)} />
      ) : (
        <ChatForm username={username} />
      )}
    </Paper>
  );
};
