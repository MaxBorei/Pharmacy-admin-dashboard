import Loader from "../../components/Loader/Loader";
import type {
  ProductDataItem,
  ProductDataPagination,
} from "../../lib/types/Products";
import css from "./ProductsPage.module.css";
import { useCallback, useEffect, useState } from "react";
import { deleteProduct, getProducts } from "../../lib/products";
import { Filter } from "../../components/Filter/Filter";
import { Pagination } from "../../components/Pagination/Pagination";
import Modal from "../../components/Modal/Modal";
import { ProductFormModal } from "../../components/ProductFormModal/ProductFormModal";

export const ProductsPage = () => {
  const [data, setData] = useState<ProductDataPagination | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [inputValue, setInputValue] = useState("");

  const [appliedName, setAppliedName] = useState("");

  const [modalType, setModalType] = useState<"create" | "edit" | null>(null);

  const openCreate = () => setModalType("create");
  const openEdit = (product: ProductDataItem) => {
    setSelectedProduct(product);
    setModalType("edit");
  };

  const deleteItem = async (product: ProductDataItem) => {
    await deleteProduct(product._id);
    fetchData();
  };
  const closeModal = () => setModalType(null);

  const [selectedProduct, setSelectedProduct] =
    useState<null | ProductDataItem>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getProducts(currentPage, appliedName);
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
          <button
            type="button"
            className={css.productsPage_btn_modal}
            onClick={openCreate}
          >
            <svg className={css.productsPage_modal_btn_svg}>
              <use href="/sprite.svg#icon-plus"></use>
            </svg>
          </button>
          <p className={css.productsPage_text_modal}>Add a new product</p>
          {modalType && (
            <Modal onClose={closeModal}>
              {modalType === "create" && <h2>Create product</h2>}
              {modalType === "edit" && (
                <ProductFormModal
                  modalType={modalType}
                  selectedProduct={selectedProduct}
                  onClose={closeModal}
                  refetchProducts={fetchData}
                />
              )}
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
              <td>
                <div className={css.productsPage_modal_btn_edit_box}>
                  <button
                    className={css.productsPage_modal_btn_edit}
                    onClick={() => openEdit(item)}
                  >
                    <svg className={css.productsPage_modal_edit_svg}>
                      <use href="/sprite.svg#icon-edit"></use>
                    </svg>
                  </button>
                  <button
                    className={css.productsPage_modal_btn_delete}
                    onClick={() => deleteItem(item)}
                  >
                    <svg className={css.productsPage_modal_delete_svg}>
                      <use href="/sprite.svg#icon-trash"></use>
                    </svg>
                  </button>
                </div>
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
