import { api } from "./api";

export const getTotalInfo = async () => {
  const { data } = await api.get("/dashboard");
  return data.data;
};
