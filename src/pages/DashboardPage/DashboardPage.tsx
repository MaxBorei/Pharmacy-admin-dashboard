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
      <div className={css.dasboard_table_container}>
        <table className={css.dasboard_table_one}>
          <caption>Recent Customers</caption>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Spent</th>
            </tr>
          </thead>
          <tbody>
            {data?.recentCustomers.map((i) => (
              <tr key={i._id}>
                <td>
                  <div className={css.dasboard_table_one_avatar_box}>
                    <img
                      src={i.image}
                      alt={i.name}
                      className={css.dasboard_table_one_avatar}
                    />
                    <p>{i.name}</p>
                  </div>
                </td>
                <td>{i.email}</td>
                <td>{i.spent}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <table className={css.dasboard_table_one}>
          <caption>Income/Expenses</caption>
          <thead>
            <tr>
              <th colSpan={3}>Today</th>
            </tr>
          </thead>
          <tbody>
            {data?.transactions.map((i) => {
              const isCancelled = i.status === "Cancelled";

              return (
                <tr key={i._id}>
                  <td>
                    <p className={isCancelled ? css.expense : css.income}>
                      {isCancelled ? "Expense" : "Income"}
                    </p>
                  </td>
                  <td>{i.name}</td>
                  <td
                    className={
                      isCancelled ? css.expenseAmount : css.incomeAmount
                    }
                  >
                    {isCancelled ? `-${i.price}` : `+${i.price}`}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};
