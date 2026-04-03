import { NavLink } from "react-router-dom";
import css from "./Sidebar.module.css";
import clsx from "clsx";

type Path = "dashboard" | "orders" | "products" | "customers" | "suppliers";

type SidebarItem = {
  path: Path;
  icon: string;
  label: string;
};

export const Sidebar = () => {
  const arrayPath: SidebarItem[] = [
    { path: "dashboard", icon: "icon-ic_round-dashboard", label: "Dashboard" },
    { path: "orders", icon: "icon-ic_round-shopping-cart", label: "Orders" },
    { path: "products", icon: "icon-mingcute_flask-fill", label: "Products" },
    { path: "customers", icon: "icon-mdi_local-pharmacy", label: "Customers" },
    { path: "suppliers", icon: "icon-mdi_users", label: "Suppliers" },
  ];
  return (
    <aside className={css.layout_container_sidebar}>
      {arrayPath.map((item) => (
        <NavLink
          key={item.path}
          to={`/${item.path}`}
          className={({ isActive }) =>
            clsx(css.sidebar_btn, isActive && css.active)
          }
          aria-label={item.label}
        >
          <svg className={css.sidebar_svg}>
            <use href={`/sprite.svg#${item.icon}`}></use>
          </svg>
        </NavLink>
      ))}
    </aside>
  );
};
