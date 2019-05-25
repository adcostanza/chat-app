import Axios from "axios";

export namespace MessagesService {
  const BASE_URL =
    "https://quriultc2h.execute-api.us-west-1.amazonaws.com/prd/";

  export const login = async (username: string) => {
    return await Axios.post(BASE_URL + "login", { username });
  };
  export const getMessages = () => {};
  export const writeMessage = () => {};

  export let token = "";
}
