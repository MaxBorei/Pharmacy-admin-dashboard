export type SupplierDataItem = {
  _id: string;
  name: string;
  address: string;
  suppliers: string;
  date: string;
  amount: string;
  status: string;
};

export type SupplierData = SupplierDataItem[];

export type SupplierDataPagination = {
  data: SupplierDataItem[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};
