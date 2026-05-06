import { api } from "./api";
import type { SupplierDataItem } from "./types/Suppliers";

export const getSuppliers = async (page: number, name: string) => {
  const { data } = await api.get(
    `/suppliers?name=${name}&page=${page}&perPage=5`,
  );
  return data.data;
};
export const updateSupplier = async (
  supplierId: string,
  payload: Partial<SupplierDataItem>,
) => {
  const { data } = await api.patch(`/suppliers/${supplierId}`, payload);
  return data.data;
};
export const createSupplier = async (payload: Partial<SupplierDataItem>) => {
  const { data } = await api.post("/suppliers", payload);
  return data.data;
};
