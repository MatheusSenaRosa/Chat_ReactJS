import { User } from "@types";

export const formatDateToLocaleTime = (date: string) => {
  const formattedTime = new Date(date).toLocaleTimeString("pt-br");

  const timeWithoutSeconds = formattedTime.slice(0, 5);

  return timeWithoutSeconds;
};

export const getReceiverUser = (sessionId: string, users: User[]) => {
  return users.find((user) => user.id !== sessionId);
};
