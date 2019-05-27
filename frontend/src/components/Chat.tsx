import * as React from "react";
import { Messages } from "./Messages";
import { ChatForm } from "./ChatForm";

export const Chat = () => {
  return (
    <>
      <ChatForm />
      <Messages />
    </>
  );
};
