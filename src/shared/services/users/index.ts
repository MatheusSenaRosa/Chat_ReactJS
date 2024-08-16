import { api } from "../config";
import { FindUserById, GetUsers, UseUsersServices } from "./types";

export const useUsersServices: UseUsersServices = () => {
  const baseUrl = "/users";

  const findUserById: FindUserById = async (id) => {
    const response = await api.get(`${baseUrl}/${id}`);

    return response?.data;
  };

  const getUsers: GetUsers = async () => {
    const response = await api.get(baseUrl);

    return response?.data;
  };

  return {
    findUserById,
    getUsers,
  };
};
