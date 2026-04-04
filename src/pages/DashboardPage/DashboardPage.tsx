import { Navigate } from "react-router-dom";
import css from "./DashboardPage.module.css";
import { getTotalInfo } from "../../lib/dashboard";
import { useEffect, useState } from "react";

type DashboardData = {
  allProducts: number;
  allSuppliers: number;
  allCustomers: number;
};

export const DashboardPage = () => {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTotalInfo();
      console.log(data);
      setData(data);
    };

    fetchData();
  }, []);

  const token = localStorage.getItem("accessToken");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return (
    <section className={css.dashboardPage}>
      <div className={css.dashboardPage_container_total_info}>
        <div className={css.dashboardPage_container_info}>
          <div className={css.dashboardPage_container_svg_label}>
            <svg className={css.dashboardPage_total_info_svg}>
              <use href="/sprite.svg#icon-streamline_money"></use>
            </svg>
            <p className={css.dashboardPage_total_info_text}>All products</p>
          </div>
          <div className={css.dashboardPage_container_value}>
            <p className={css.dashboardPage_value_text}>
              {data?.allProducts ?? 0}
            </p>
          </div>
        </div>
        <div className={css.dashboardPage_container_info}>
          <div className={css.dashboardPage_container_svg_label}>
            <svg className={css.dashboardPage_total_info_svg}>
              <use href="/sprite.svg#icon-mdi_users"></use>
            </svg>
            <p className={css.dashboardPage_total_info_text}>All suppliers</p>
          </div>
          <div className={css.dashboardPage_container_value}>
            <p className={css.dashboardPage_value_text}>
              {data?.allSuppliers ?? 0}
            </p>
          </div>
        </div>
        <div className={css.dashboardPage_container_info}>
          <div className={css.dashboardPage_container_svg_label}>
            <svg className={css.dashboardPage_total_info_svg}>
              <use href="/sprite.svg#icon-mdi_users"></use>
            </svg>
            <p className={css.dashboardPage_total_info_text}>All customers</p>
          </div>
          <div className={css.dashboardPage_container_value}>
            <p className={css.dashboardPage_value_text}>
              {data?.allCustomers ?? 0}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
