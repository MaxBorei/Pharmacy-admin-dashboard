export type Key = "allProducts" | "allSuppliers" | "allCustomers";

export type DashboardData = {
  allProducts: number;
  allSuppliers: number;
  allCustomers: number;
};

export type InfoDashboardItem = {
  label: string;
  key: Key;
  icon: string;
};
