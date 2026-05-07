import { useState } from "react";
import { createSupplier, updateSupplier } from "../../lib/suppliers";
import type { SupplierDataItem } from "../../lib/types/Suppliers";
import css from "./SuppliersFormModal.module.css";

const options = ["Active", "Deactive"];

const formatDateForBackend = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatDateForInput = (date?: string) => {
  if (!date) return new Date().toISOString().split("T")[0];

  return new Date(date).toISOString().split("T")[0];
};

type SupplierFormModalProps = {
  modalType: "create" | "edit";
  selectedSupplier: SupplierDataItem | null;
  onClose: () => void;
  refetchSuppliers: () => Promise<void>;
};

export const SupplierFormModal = ({
  modalType,
  selectedSupplier,
  onClose,
  refetchSuppliers,
}: SupplierFormModalProps) => {
  const [value, setValue] = useState(selectedSupplier?.status ?? "Active");
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const address = formData.get("address") as string;
    const suppliers = formData.get("suppliers") as string;
    const date = formatDateForBackend(formData.get("date") as string);
    const amount = formData.get("amount") as string;
    const status = formData.get("status") as string;
    const supplierId = selectedSupplier?._id;

    const payload = {
      name,
      address,
      date,
      amount,
      suppliers,
      status,
    };

    if (modalType === "create") {
      await createSupplier(payload);
    } else {
      if (!supplierId) return;
      await updateSupplier(supplierId, payload);
    }

    await refetchSuppliers();
    onClose();
  };

  return (
    <div>
      <h2 className={css.modalTitle}>
        {modalType === "edit" ? "Edit supplier" : "Add a new suppliers"}
      </h2>

      <form className={css.form} onSubmit={onSubmit}>
        <div className={css.inputsWrapper}>
          <div className={css.first_line_input_box}>
            <input
              className={css.input}
              type="text"
              name="name"
              defaultValue={selectedSupplier?.name ?? ""}
              placeholder="Suppliers Info"
            />

            <input
              className={css.input}
              type="text"
              name="address"
              defaultValue={selectedSupplier?.address ?? ""}
              placeholder="Address"
            />
          </div>

          <div className={css.first_line_input_box}>
            <input
              className={css.input}
              type="text"
              name="suppliers"
              defaultValue={selectedSupplier?.suppliers ?? ""}
              placeholder="Company"
            />

            <input
              className={css.input}
              type="date"
              name="date"
              defaultValue={formatDateForInput(selectedSupplier?.date)}
            />
          </div>

          <div className={css.first_line_input_box}>
            <input
              className={css.input}
              type="text"
              name="amount"
              defaultValue={selectedSupplier?.amount ?? ""}
              placeholder="Ammount"
            />

            <div className={css.select}>
              <input type="hidden" name="status" value={value} />

              <button
                type="button"
                className={css.selectBtn}
                onClick={() => setIsOpen(!isOpen)}
              >
                <span>{value}</span>

                <span>
                  <svg className={css.selectBtnSvg}>
                    <use
                      href={
                        isOpen
                          ? "/sprite.svg#icon-arow-up"
                          : "/sprite.svg#icon-arow-down"
                      }
                    />
                  </svg>
                </span>
              </button>

              {isOpen && (
                <ul className={css.options}>
                  {options.map((option) => (
                    <li key={option}>
                      <button
                        type="button"
                        className={`${css.option} ${
                          value === option ? css.activeOption : ""
                        }`}
                        onClick={() => {
                          setValue(option);
                          setIsOpen(false);
                        }}
                      >
                        {option}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.btnSave}>
            Save
          </button>

          <button type="button" className={css.btnCancel} onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
