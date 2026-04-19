import { api } from "./api";
import type { ProductDataItem } from "./types/Products";

export const getProducts = async (page: number, name: string) => {
  const { data } = await api.get(
    `/products?name=${name}&page=${page}&perPage=5`,
  );
  return data.data;
};

export const updateProduct = async (
  productId: string,
  payload: Partial<ProductDataItem>,
) => {
  const { data } = await api.patch(`/products/${productId}`, payload);
  return data.data;
};
