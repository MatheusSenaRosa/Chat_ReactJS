export type Message = {
  id: string;
  chatId: string;
  senderId: string;
  text: string;
  createdAt: string;
};

export type Session = {
  id: string;
  nickname: string;
};

export type User = {
  id: string;
  nickname: string;
};

export type Chat = {
  id: string;
  messages: Message[];
  users: User[];
};

export type OpenedChat = {
  id?: string;
  messages: Message[];
  users: User[];
};
