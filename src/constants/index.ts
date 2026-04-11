import type { InfoDashboardItem } from "../lib/types/dashboard";
import type { Status } from "../lib/types/Order";

export const infoDashboard: InfoDashboardItem[] = [
  {
    label: "All products",
    key: "allProducts",
    icon: "icon-streamline_money",
  },
  { label: "All suppliers", key: "allSuppliers", icon: "icon-mdi_users" },
  { label: "All customers", key: "allCustomers", icon: "icon-mdi_users" },
];

export const statusClassMap: Record<Status, string> = {
  Completed: "completed",
  Confirmed: "confirmed",
  Pending: "pending",
  Cancelled: "cancelled",
  Processing: "processing",
  Shipped: "shipped",
  Delivered: "delivered",
};
