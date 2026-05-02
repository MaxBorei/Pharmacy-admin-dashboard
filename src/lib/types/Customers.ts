export type CustomerDataItem = {
  _id: string;
  photo: string;
  name: string;
  email: string;
  spent: string;
  phone: string;
  address: string;
  register_date: string;
};

export type CustomersDataPagination = {
  data: CustomerDataItem[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};
