import { api } from "./api";

export const getOrders = async (page: number) => {
  const { data } = await api.get(`/orders?page=${page}&perPage=5`);
  return data.data;
};
