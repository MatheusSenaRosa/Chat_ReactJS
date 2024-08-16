import { api } from "../config";
import { CreateChat, UseChatsServices } from "./types";

export const useChatsServices: UseChatsServices = () => {
  const baseUrl = "/chats";

  const createChat: CreateChat = async (body) => {
    const response = await api.post(baseUrl, body);

    return response?.data;
  };

  return {
    createChat,
  };
};
