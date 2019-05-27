import * as React from "react";
import { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import { LoginForm } from "./components/LoginForm";
import AppBar from "./components/AppBar";
import { MessagesService } from "./messagesService";
import { Chat } from "./components/Chat";

export const App = () => {
  const [username, setUsername] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token != null) {
      MessagesService.token = token;
      const _username = localStorage.getItem("username");
      setUsername(_username);
      MessagesService.username = _username;
    }
  }, []);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        flexDirection: "column"
      }}
    >
      <AppBar />
      <Paper
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          flexDirection: "row",
          flexWrap: "wrap"
        }}
      >
        {username == null || username == "" ? (
          <LoginForm setUsername={(u: string) => setUsername(u)} />
        ) : (
          <Chat />
        )}
      </Paper>
    </div>
  );
};
