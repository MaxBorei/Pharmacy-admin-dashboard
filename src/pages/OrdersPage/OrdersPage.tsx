import { useEffect, useState } from "react";
import { getOrders } from "../../lib/order";
import Loader from "../../components/Loader/Loader";
import css from "./OrderPage.module.css";
import type { Status } from "../../lib/types/Order";
import { statusClassMap } from "../../constants";

export type OrderDataItem = {
  _id: string;
  photo: string;
  name: string;
  address: string;
  products: string;
  order_date: string;
  price: string;
  status: Status;
};

export type OrderData = OrderDataItem[];

export const OrderPage = () => {
  const [data, setData] = useState<OrderData | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getOrders();
        setData(data);
      } catch (error: unknown) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
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
          {data?.map((item) => (
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
    </section>
  );
};
