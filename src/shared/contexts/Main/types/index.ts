import { Chat, OpenedChat, Session } from "@types";

export type AppContextType = {
  session: Session;
  openedChat: OpenedChat;
  chats: Chat[];
  isRestoringSession: boolean;
  isLoadingChats: boolean;
  setOpenedChat: React.Dispatch<React.SetStateAction<OpenedChat>>;
  createSession: (user: Session) => void;
  destroySession: () => void;
};
