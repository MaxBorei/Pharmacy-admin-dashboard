import css from "./SuppliersPage.module.css";
import { useCallback, useEffect, useState } from "react";
import type {
  SupplierDataItem,
  SupplierDataPagination,
} from "../../lib/types/Suppliers";
import { getSuppliers } from "../../lib/suppliers";
import { Filter } from "../../components/Filter/Filter";
import Loader from "../../components/Loader/Loader";
import { Pagination } from "../../components/Pagination/Pagination";
import { ProductFormModal } from "../../components/ProductFormModal/ProductFormModal";
import Modal from "../../components/Modal/Modal";

export const SuppliersPage = () => {
  const [data, setData] = useState<SupplierDataPagination | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [appliedName, setAppliedName] = useState("");

  const [modalType, setModalType] = useState<"create" | "edit" | null>(null);

  const openCreate = () => {
    setSelectedSupplier(null);
    setModalType("create");
  };

  const openEdit = (product: SupplierDataItem) => {
    setSelectedSupplier(product);
    setModalType("edit");
  };

  const closeModal = () => setModalType(null);

  const [selectedSupplier, setSelectedSupplier] =
    useState<null | SupplierDataItem>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getSuppliers(currentPage, appliedName);
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
              {modalType === "create" && (
                <ProductFormModal
                  modalType="create"
                  selectedProduct={null}
                  onClose={closeModal}
                  refetchProducts={fetchData}
                />
              )}
              {modalType === "edit" && (
                <ProductFormModal
                  modalType={modalType}
                  selectedSupplier={selectedSupplier}
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
            <th>Suppliers Info</th>
            <th>Address</th>
            <th>Company</th>
            <th>Delivery date</th>
            <th>Ammount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.data.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.address}</td>
              <td>{item.suppliers}</td>
              <td>{item.date}</td>
              <td>{item.amount}</td>
              <td>{item.status}</td>
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
