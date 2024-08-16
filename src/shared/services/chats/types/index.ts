export type CreateChat = (body: {
  receiverId: string;
  senderId: string;
}) => Promise<{ chatId: string }>;

export type UseChatsServices = () => {
  createChat: CreateChat;
};
