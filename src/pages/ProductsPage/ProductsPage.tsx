import Loader from "../../components/Loader/Loader";
import type { ProductDataPagination } from "../../lib/types/Products";
import css from "./ProductsPage.module.css";
import { useEffect, useState } from "react";
import { getProducts } from "../../lib/products";
import { Filter } from "../../components/Filter/Filter";
import { Pagination } from "../../components/Pagination/Pagination";
import Modal from "../../components/Modal/Modal";

export const ProductsPage = () => {
  const [data, setData] = useState<ProductDataPagination | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [inputValue, setInputValue] = useState("");

  const [appliedName, setAppliedName] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getProducts(currentPage, appliedName);
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
    <section className={css.productsPage}>
      {isLoading && <Loader message="Завантажуємо дані..." />}

      <div className={css.productsPage_filter_modal_container}>
        <Filter
          inputValue={inputValue}
          setInputValue={setInputValue}
          onSubmit={handleSubmit}
        />
        <div className={css.productsPage_modal_container}>
          <button className={css.productsPage_btn_modal} onClick={openModal}>
            <svg className={css.productsPage_modal_btn_svg}>
              <use href="../../../public/sprite.svg#icon-plus"></use>
            </svg>
          </button>
          <p className={css.productsPage_text_modal}>Add a new product</p>
          {isModalOpen && (
            <Modal onClose={closeModal}>
              <h2>Custom Modal Content</h2>
              <p>This is a reusable modal with dynamic content.</p>
            </Modal>
          )}
        </div>
      </div>

      <table className={css.productsPage_table}>
        <caption>All orders</caption>
        <thead>
          <tr>
            <th>Product Info</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Suppliers</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.data.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.stock}</td>
              <td>{item.suppliers}</td>
              <td>{item.price}</td>
              <td></td>
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
