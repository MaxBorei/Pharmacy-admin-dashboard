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
import Modal from "../../components/Modal/Modal";
import { SupplierFormModal } from "../../components/SuppliersFormModal/SuppliersFormModal";

const formatDateView = (date?: string) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const SuppliersPage = () => {
  const [data, setData] = useState<SupplierDataPagination | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [appliedName, setAppliedName] = useState("");
  const [modalType, setModalType] = useState<"create" | "edit" | null>(null);
  const [selectedSupplier, setSelectedSupplier] =
    useState<SupplierDataItem | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      const suppliers = await getSuppliers(currentPage, appliedName);
      setData(suppliers);
    } catch (error: unknown) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, appliedName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const openCreate = () => {
    setSelectedSupplier(null);
    setModalType("create");
  };

  const openEdit = (supplier: SupplierDataItem) => {
    setSelectedSupplier(supplier);
    setModalType("edit");
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedSupplier(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAppliedName(inputValue);
    setCurrentPage(1);
  };

  return (
    <section className={css.suppliersPage}>
      {isLoading && <Loader message="Завантажуємо дані..." />}

      <div className={css.suppliersPage_filter_modal_container}>
        <Filter
          inputValue={inputValue}
          setInputValue={setInputValue}
          onSubmit={handleSubmit}
        />

        <div className={css.suppliersPage_modal_container}>
          <button
            type="button"
            className={css.suppliersPage_btn_modal}
            onClick={openCreate}
          >
            <p className={css.suppliersPage_text_modal}>Add a new suppliers</p>
          </button>

          {modalType && (
            <Modal onClose={closeModal}>
              <SupplierFormModal
                modalType={modalType}
                selectedSupplier={
                  modalType === "edit" ? selectedSupplier : null
                }
                onClose={closeModal}
                refetchSuppliers={fetchData}
              />
            </Modal>
          )}
        </div>
      </div>

      <table className={css.suppliersPage_table}>
        <caption>All suppliers</caption>

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
          {data?.data.map((item) => {
            const isActive = item.status === "Active";

            return (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.address}</td>
                <td>{item.suppliers}</td>
                <td>{formatDateView(item.date)}</td>
                <td>{item.amount.replace(/[^\d.,-]/g, "")}</td>

                <td>
                  <p className={isActive ? css.active : css.deactive}>
                    {item.status}
                  </p>
                </td>

                <td>
                  <button
                    type="button"
                    className={css.suppliersPage_modal_btn_edit}
                    onClick={() => openEdit(item)}
                  >
                    <svg className={css.suppliersPage_modal_edit_svg}>
                      <use href="/sprite.svg#icon-edit"></use>
                    </svg>

                    <p className={css.suppliersPage_modal_btn_edit_text}>
                      Edit
                    </p>
                  </button>
                </td>
              </tr>
            );
          })}
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
