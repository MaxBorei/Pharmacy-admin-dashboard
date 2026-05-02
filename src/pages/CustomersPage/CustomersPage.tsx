import { useCallback, useEffect, useState } from "react";
import { getCustomers } from "../../lib/customers";
import css from "./CustomersPage.module.css";
import Loader from "../../components/Loader/Loader";
import { Filter } from "../../components/Filter/Filter";
import { Pagination } from "../../components/Pagination/Pagination";
import type { CustomersDataPagination } from "../../lib/types/Customers";

export const CustomersPage = () => {
  const [data, setData] = useState<CustomersDataPagination | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [inputValue, setInputValue] = useState("");

  const [appliedName, setAppliedName] = useState("");

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getCustomers(currentPage, appliedName);
      setData(data);
    } catch (error: unknown) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, appliedName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAppliedName(inputValue);
    setCurrentPage(1);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };
  return (
    <section className={css.customersPage}>
      {isLoading && <Loader message="Завантажуємо дані..." />}

      <Filter
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSubmit={handleSubmit}
      />

      <table className={css.customersPage_table}>
        <caption>Customers Data</caption>
        <thead>
          <tr>
            <th>User Info</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Register date</th>
          </tr>
        </thead>
        <tbody>
          {data?.data.map((item) => (
            <tr key={item._id}>
              <td>
                <div className={css.customers_table_avatar_box}>
                  <img
                    src={item.photo}
                    alt={item.name}
                    className={css.customers_table_avatar}
                  />
                  <p>{item.name}</p>
                </div>
              </td>
              <td>{item.email}</td>
              <td>{item.address}</td>
              <td>{item.phone}</td>
              <td>{formatDate(item.register_date)}</td>
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
