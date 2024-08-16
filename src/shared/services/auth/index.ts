import { api } from "../config";
import { SignIn, UseAuthServices } from "./types";

export const useAuthServices: UseAuthServices = () => {
  const baseUrl = "/auth";

  const signIn: SignIn = async (body) => {
    const response = await api.post(`${baseUrl}/signin`, body);

    return response?.data;
  };

  return {
    signIn,
  };
};
