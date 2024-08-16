import { Chat } from "@types";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_API_BASE_URL);

export const useChatsWebSocket = (sessionId: string) => {
  const [data, setData] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      socket.connect();

      socket.emit("getChats", sessionId);

      socket.on("chats", (response) => {
        setIsLoading(false);
        setData(response);
      });
    }

    return () => {
      socket.off("chats");
      setIsLoading(true);
      setData([]);
    };
  }, [sessionId]);

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  return {
    data,
    isLoading,
  };
};
