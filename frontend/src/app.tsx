import * as React from "react";
import { Paper } from "@material-ui/core";
import { LoginForm } from "./components/LoginForm";
import { useState } from "react";
interface AppState {
  token: string;
  setToken: (t: string) => void;
  username: string;
  setUsername: (u: string) => void;
}
export const AppState = React.createContext<AppState>({
  token: "",
  username: "",
  setUsername: (u: string) => {},
  setToken: (t: string) => {}
});
export const App = () => {
  const [token, setToken] = useState("");
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
      <AppState.Provider value={{ username, token, setUsername, setToken }}>
        <LoginForm />
      </AppState.Provider>
    </Paper>
  );
};
