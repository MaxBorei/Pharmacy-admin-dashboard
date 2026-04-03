type LoginPayload = {
  email: string;
  password: string;
};

type LoginResponse = {
  status: number;
  message: string;
  data: {
    accessToken: string;
  };
};

import { api } from "./api";

export const login = async (payload: LoginPayload) => {
  const { data } = await api.post<LoginResponse>("/login", payload);
  return data;
};

export const logout = () => {
  return api.post("/logout");
};
