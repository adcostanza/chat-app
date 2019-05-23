export interface Message {
  id: string;
  fromUser: string;
  toUsers: string[];
  message: string;
}
