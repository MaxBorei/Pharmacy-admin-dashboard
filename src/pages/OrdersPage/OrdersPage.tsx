import { useEffect, useState } from "react";
import { getOrders } from "../../lib/order";
import Loader from "../../components/Loader/Loader";
import css from "./OrderPage.module.css";
import type { OrderDataPagination } from "../../lib/types/Order";
import { statusClassMap } from "../../constants";
import { Pagination } from "../../components/Pagination/Pagination";
import { Filter } from "../../components/Filter/Filter";

export const OrderPage = () => {
  const [data, setData] = useState<OrderDataPagination | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [inputValue, setInputValue] = useState("");

  const [appliedName, setAppliedName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getOrders(currentPage, appliedName);
        setData(data);
      } catch (error: unknown) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [currentPage, appliedName]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAppliedName(inputValue);
    setCurrentPage(1);
  };
  return (
    <section className={css.orderPage}>
      {isLoading && <Loader message="Завантажуємо дані..." />}

      <Filter
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSubmit={handleSubmit}
      />

      <table className={css.order_table}>
        <caption>All orders</caption>
        <thead>
          <tr>
            <th>User Info</th>
            <th>Address</th>
            <th>Products</th>
            <th>Order date</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data?.data.map((item) => (
            <tr key={item._id}>
              <td>
                <div className={css.order_table_avatar_box}>
                  <img
                    src={item.photo}
                    alt={item.name}
                    className={css.order_table_avatar}
                  />
                  <p>{item.name}</p>
                </div>
              </td>
              <td>{item.address}</td>
              <td>{item.products}</td>
              <td>{item.order_date}</td>
              <td>{item.price}</td>
              <td>
                <p className={css[statusClassMap[item.status] ?? ""]}>
                  {item.status}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={data?.totalPages ?? 0}
        setCurrentPage={setCurrentPage}
      />
    </section>
  );
};
