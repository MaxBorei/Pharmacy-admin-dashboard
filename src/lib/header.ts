import { api } from "./api";

export const getUserInfo = async () => {
  const { data } = await api.get("/user-info");
  return data.data;
};
