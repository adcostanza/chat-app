import Axios from "axios";

export namespace MessagesService {
  const BASE_URL = "https://quriultc2h.execute-api.us-west-1.amazonaws.com/prd/";

  export const login = async (username: string) => {
    return await Axios.post(BASE_URL + "login", { username });
  };
  export const getMessages = async () => {
    return (await Axios.get(BASE_URL + "messages", { headers: { token } })).data
      .messages;
  };
  export const writeMessage = async (toUsers: string[], message: string) => {
    return await Axios.post(
      BASE_URL + "messages",
      { toUsers, message },
      { headers: { token } }
    );
  };

  export let token = "";
  export let username = "";
}
