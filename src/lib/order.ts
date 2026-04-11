import { api } from "./api";

export const getOrders = async () => {
  const { data } = await api.get("/orders");
  return data.data;
};
