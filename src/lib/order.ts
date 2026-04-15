import { api } from "./api";

export const getOrders = async (page: number, name: string) => {
  const { data } = await api.get(`/orders?name=${name}&page=${page}&perPage=5`);
  return data.data;
};
