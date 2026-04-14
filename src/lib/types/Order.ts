export type Status =
  | "Completed"
  | "Confirmed"
  | "Pending"
  | "Cancelled"
  | "Processing"
  | "Shipped"
  | "Delivered";

export type OrderDataItem = {
  _id: string;
  photo: string;
  name: string;
  address: string;
  products: string;
  order_date: string;
  price: string;
  status: Status;
};

export type OrderData = OrderDataItem[];

export type OrderDataPagination = {
  data: OrderDataItem[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};
