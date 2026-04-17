import type { Status } from "./Order";

export type Key = "allProducts" | "allSuppliers" | "allCustomers";

export type DashboardData = {
  allProducts: number;
  allSuppliers: number;
  allCustomers: number;
  recentCustomers: DashboardDataRecentCustomers[];
  transactions: DashboardDataTransactions[];
};

export type DashboardDataRecentCustomers = {
  _id: string;
  image: string;
  name: string;
  email: string;
  spent: string;
  phone: string;
  address: string;
  register_date: string;
};
export type DashboardDataTransactions = {
  _id: string;
  photo: string;
  name: string;
  address: string;
  products: string;
  price: string;
  status: Status;
  order_date: string;
};

export type InfoDashboardItem = {
  label: string;
  key: Key;
  icon: string;
};
