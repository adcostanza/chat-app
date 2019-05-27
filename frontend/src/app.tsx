import * as React from "react";
import Paper from "@material-ui/core/Paper";
import { LoginForm } from "./components/LoginForm";
import { useEffect, useState } from "react";
import { ChatForm } from "./components/ChatForm";
import AppBar from "./components/AppBar";
import { MessagesService } from "./messagesService";
export const App = () => {
  const [username, setUsername] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token != null) {
      MessagesService.token = token;
      setUsername(localStorage.getItem("username"));
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
          flexDirection: "column"
        }}
      >
        {username == null || username == "" ? (
          <LoginForm setUsername={(u: string) => setUsername(u)} />
        ) : (
          <ChatForm username={username} />
        )}
      </Paper>
    </div>
  );
};
