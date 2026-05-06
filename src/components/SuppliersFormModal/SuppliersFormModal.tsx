import { useState } from "react";
import { createSupplier, updateSupplier } from "../../lib/suppliers";
import type { SupplierDataItem } from "../../lib/types/Suppliers";
import css from "./SuppliersFormModal.module.css";

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
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const address = formData.get("address") as string;
    const suppliers = formData.get("suppliers") as string;
    const date = formData.get("date") as string;
    const amount = formData.get("amount") as string;
    const status = formData.get("status") as string;
    const id = Date.now().toString();
    const supplierId = selectedSupplier?._id;

    const payload =
      modalType === "create"
        ? { id, name, address, date, amount, suppliers, status }
        : { name, address, date, suppliers, amount, status };

    if (modalType === "create") {
      await createSupplier(payload);
    } else {
      if (!supplierId) return;
      await updateSupplier(supplierId, payload);
    }
  };
  const [value, setValue] = useState(selectedSupplier?.status ?? "Active");
  const [isOpen, setIsOpen] = useState(false);

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
            <div className={css.select}>
              <input type="hidden" name="category" value={value} />

              <button
                type="button"
                className={css.selectBtn}
                onClick={() => setIsOpen(!isOpen)}
              >
                <span>{value}</span>
                <span>
                  <svg className={css.selectBtnSvg}>
                    <use href="/sprite.svg#icon-arow"></use>
                  </svg>
                </span>
              </button>

              {isOpen && (
                <ul className={css.options}>
                  {options.map((option) => (
                    <li key={option}>
                      <button
                        type="button"
                        className={`${css.option} ${value === option ? css.activeOption : ""}`}
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

          <div className={css.first_line_input_box}>
            <input
              className={css.input}
              type="text"
              name="stock"
              defaultValue={selectedSupplier?.stock ?? ""}
              placeholder="Stock"
            />
            <input
              className={css.input}
              type="text"
              name="suppliers"
              defaultValue={selectedSupplier?.suppliers ?? ""}
              placeholder="Suppliers"
            />
          </div>

          <input
            className={css.input}
            type="text"
            name="price"
            defaultValue={selectedSupplier?.price ?? ""}
            placeholder="Price"
          />
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
