import { api } from "./api";

export const getSuppliers = async (page: number, name: string) => {
  const { data } = await api.get(
    `/suppliers?name=${name}&page=${page}&perPage=5`,
  );
  return data.data;
};
