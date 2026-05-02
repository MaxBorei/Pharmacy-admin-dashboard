import { api } from "./api";

export const getCustomers = async (page: number, name: string) => {
  const { data } = await api.get(
    `/customers?name=${name}&page=${page}&perPage=5`,
  );
  return data.data;
};
