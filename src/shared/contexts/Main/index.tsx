import { useUsersServices } from "@services";
import { createContext, useEffect, useState } from "react";
import { AppContextType } from "./types";
import { useChatsWebSocket } from "@websockets";
import { OpenedChat, Session } from "@types";

export const MainContext = createContext<AppContextType>({} as AppContextType);

type Props = {
  children: React.ReactNode;
};

export const MainContextProvider = ({ children }: Props) => {
  const [openedChat, setOpenedChat] = useState<OpenedChat>();
  const [session, setSession] = useState<Session>();
  const [isRestoringSession, setIsRestoringSession] = useState(false);

  const { findUserById } = useUsersServices();
  const { data: chats, isLoading: isLoadingChats } = useChatsWebSocket(
    session?.id
  );

  const returnIsSessionIdValid = async (sessionId: string) => {
    try {
      await findUserById(sessionId);
      return true;
    } catch {
      return false;
    }
  };

  const restoreSession = async () => {
    setIsRestoringSession(true);

    const storedSession = localStorage.getItem("session");

    if (storedSession) {
      const parsedSession = JSON.parse(storedSession) as Session;
      const isSessionIdValid = await returnIsSessionIdValid(parsedSession.id);

      if (!isSessionIdValid) {
        localStorage.removeItem("session");
        setIsRestoringSession(false);
        return;
      }

      setSession(parsedSession);
      setIsRestoringSession(false);
    }

    setIsRestoringSession(false);
  };

  const createSession = (session: Session) => {
    localStorage.setItem("session", JSON.stringify(session));
    setSession(session);
  };

  const destroySession = () => {
    setSession(null);
    localStorage.removeItem("session");
  };

  useEffect(() => {
    if (!session) {
      restoreSession();
    }
  }, [session]);

  return (
    <MainContext.Provider
      value={{
        session,
        isRestoringSession,
        chats,
        openedChat,
        isLoadingChats,
        setOpenedChat,
        createSession,
        destroySession,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
