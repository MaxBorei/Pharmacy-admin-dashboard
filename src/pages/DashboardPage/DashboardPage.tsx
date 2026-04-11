import { useNavigate } from "react-router-dom";
import css from "./DashboardPage.module.css";
import { getTotalInfo } from "../../lib/dashboard";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import { DashboardCardInfo } from "../../components/DashboardCardInfo/DashboardCardInfo";
import type { DashboardData } from "../../lib/types/dashboard";
import { infoDashboard } from "../../constants";

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
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <section className={css.dashboardPage}>
      {isLoading && <Loader message="Завантажуємо дані..." />}
      <div className={css.dashboardPage_container_total_info}>
        {infoDashboard.map((item) => (
          <DashboardCardInfo
            key={item.key}
            label={item.label}
            icon={item.icon}
            value={data?.[item.key] ?? 0}
          />
        ))}
      </div>
    </section>
  );
};
