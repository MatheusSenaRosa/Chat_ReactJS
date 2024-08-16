import { Chat } from "@types";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_API_BASE_URL);

type Props = {
  chatId: string;
  sessionId: string;
};

export const useChatWebSocket = ({ chatId, sessionId }: Props) => {
  const [data, setData] = useState<Chat>({} as Chat);
  const [isLoading, setIsLoading] = useState(Boolean(chatId));

  const sendMessage = (text: string, newChatId?: string) => {
    socket.emit("sendMessage", {
      senderId: sessionId,
      chatId: chatId || newChatId,
      text,
    });
  };

  useEffect(() => {
    if (chatId && sessionId) {
      socket.connect();

      socket.emit("getChat", chatId);

      socket.on("chat", (response) => {
        setIsLoading(false);
        setData(response);
      });
    }

    return () => {
      socket.off("chat");
      setData({} as Chat);
    };
  }, [chatId, sessionId]);

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  return {
    data,
    isLoading,
    sendMessage,
  };
};
