import { api } from "./api";

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
type RefreshResponse = {
  status: number;
  message: string;
  data: {
    accessToken: string;
  };
};

export const login = async (payload: LoginPayload) => {
  const { data } = await api.post<LoginResponse>("/login", payload);
  return data;
};

export const logout = () => {
  return api.post("/logout");
};

export const refreshSession = async () => {
  const { data } = await api.post<RefreshResponse>("/refresh");
  const newAccessToken = data.data.accessToken;

  localStorage.setItem("accessToken", newAccessToken);

  return newAccessToken;
};
