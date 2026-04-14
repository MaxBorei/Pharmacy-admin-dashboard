import { useEffect, useState } from "react";
import { getOrders } from "../../lib/order";
import Loader from "../../components/Loader/Loader";
import css from "./OrderPage.module.css";
import type { OrderDataPagination } from "../../lib/types/Order";
import { statusClassMap } from "../../constants";
import clsx from "clsx";

export const OrderPage = () => {
  const [data, setData] = useState<OrderDataPagination | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getOrders(currentPage);
        setData(data);
      } catch (error: unknown) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [currentPage]);

  const pages = data
    ? Array.from({ length: data.totalPages }, (_, i) => i + 1)
    : [];

  return (
    <section className={css.orderPage}>
      {isLoading && <Loader message="Завантажуємо дані..." />}
      <table className={css.order_table}>
        <caption>All orders</caption>
        <thead>
          <tr>
            <th scope="col">User Info</th>
            <th scope="col">Address</th>
            <th scope="col">Products</th>
            <th scope="col">Order date</th>
            <th scope="col">Price</th>
            <th scope="col">Status</th>
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
              <td>
                <p>{item.address}</p>
              </td>
              <td>
                <p>{item.products}</p>
              </td>
              <td>
                <p>{item.order_date}</p>
              </td>
              <td>
                <p>{item.price}</p>
              </td>
              <td>
                <p className={css[statusClassMap[item.status] ?? ""]}>
                  {item.status}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={css.order_pagination_container}>
        {pages.map((i) => (
          <button
            key={i}
            className={clsx(
              css.order_pagination_btn,
              currentPage === i && css.active,
            )}
            type="button"
            onClick={() => setCurrentPage(i)}
          >
            <svg className={css.order_pagination_svg}>
              <use href="/sprite.svg#icon-dot"></use>
            </svg>
          </button>
        ))}
      </div>
    </section>
  );
};
