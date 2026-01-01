import type { LogoutResponse } from "@/interfaces/logoutInterface";
import type { userInterface, userToken } from "@/interfaces/userInterface";
import { type AxiosResponse } from "axios";
import axios from "./axiosConfig";

const setTokenStorage = (response: AxiosResponse<userInterface>) => {
  const token_access = response.data.token.access;
  const token_refresh = response.data.token.refresh;
  const username = response.data.username;

  if (token_access && token_refresh && username) {
    sessionStorage.setItem("token_access", token_access);
    sessionStorage.setItem("token_refresh", token_refresh);
    sessionStorage.setItem("username", username);
  }
};

export const authService = {
  register: async (formData: FormData) => {
    const response = await axios.post<userInterface>("register/", formData);

    setTokenStorage(response);

    return response.data as userInterface;
  },

  login: async (formData: FormData) => {
    const response = await axios.post<userInterface>("login/", formData);

    setTokenStorage(response);

    return response.data as userInterface;
  },
  logout: async (token: userToken) => {
    const response = await axios.post<LogoutResponse>("logout/", token);
    if (response.status === 200) {
      sessionStorage.clear();
    }
    return response.data as LogoutResponse;
  },
};
