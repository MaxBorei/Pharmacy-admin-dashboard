import { useNavigate } from "react-router-dom";
import css from "./DashboardPage.module.css";
import { getTotalInfo } from "../../lib/dashboard";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
type Key = "allProducts" | "allSuppliers" | "allCustomers";

type DashboardData = {
  allProducts: number;
  allSuppliers: number;
  allCustomers: number;
};

type InfoDashboardItem = {
  label: string;
  key: Key;
  icon: string;
};

const infoDashboard: InfoDashboardItem[] = [
  {
    label: "All products",
    key: "allProducts",
    icon: "icon-streamline_money",
  },
  { label: "All suppliers", key: "allSuppliers", icon: "icon-mdi_users" },
  { label: "All customers", key: "allCustomers", icon: "icon-mdi_users" },
];

export const DashboardPage = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <section className={css.dashboardPage}>
      {isLoading && <Loader />}
      <div className={css.dashboardPage_container_total_info}>
        {infoDashboard.map((item) => (
          <div className={css.dashboardPage_container_info} key={item.key}>
            <div className={css.dashboardPage_container_svg_label}>
              <svg className={css.dashboardPage_total_info_svg}>
                <use href={`/sprite.svg#${item.icon}`}></use>
              </svg>
              <p className={css.dashboardPage_total_info_text}>{item.label}</p>
            </div>
            <div className={css.dashboardPage_container_value}>
              <p className={css.dashboardPage_value_text}>
                {data?.[item.key] ?? 0}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
