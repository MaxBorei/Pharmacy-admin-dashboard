import { useNavigate } from "react-router-dom";
import css from "./DashboardPage.module.css";
import { getTotalInfo } from "../../lib/dashboard";
import { useEffect, useState } from "react";
// import axios from "axios";

type DashboardData = {
  allProducts: number;
  allSuppliers: number;
  allCustomers: number;
};

export const DashboardPage = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTotalInfo();
        setData(data);
      } catch (error: unknown) {
        if (
          typeof error === "object" &&
          error !== null &&
          "response" in error
        ) {
          const err = error as {
            response?: { status?: number };
          };

          if (err.response?.status === 401) {
            localStorage.removeItem("accessToken");
            navigate("/login", { replace: true });
            return;
          }
        }

        console.log(error);
      }
    };

    fetchData();
  }, [navigate]);

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
