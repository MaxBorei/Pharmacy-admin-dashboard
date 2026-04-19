export type ProductDataItem = {
  _id: string;
  id: string;
  photo: string;
  name: string;
  suppliers: string;
  stock: string;
  price: string;
  category: string;
};

export type ProductData = ProductDataItem[];

export type ProductDataPagination = {
  data: ProductDataItem[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};
