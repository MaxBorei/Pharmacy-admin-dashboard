import { api } from "./api";

export const getProducts = async (page: number, name: string) => {
  const { data } = await api.get(
    `/products?name=${name}&page=${page}&perPage=5`,
  );
  return data.data;
};
