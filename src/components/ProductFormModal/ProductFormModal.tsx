import { useState } from "react";
import { createProduct, updateProduct } from "../../lib/products";
import type { ProductDataItem } from "../../lib/types/Products";
import css from "./ProductFormModal.module.css";

type ProductFormModalProps = {
  modalType: "create" | "edit";
  selectedProduct: ProductDataItem | null;
  onClose: () => void;
  refetchProducts: () => Promise<void>;
};

const options = [
  "Medicine",
  "Head",
  "Hand",
  "Dental Care",
  "Skin Care",
  "Eye Care",
  "Vitamins & Supplements",
  "Orthopedic Products",
  "Baby Care",
];

export const ProductFormModal = ({
  modalType,
  selectedProduct,
  onClose,
  refetchProducts,
}: ProductFormModalProps) => {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const stock = formData.get("stock") as string;
    const price = formData.get("price") as string;
    const productId = selectedProduct?._id;
    const suppliers = formData.get("suppliers") as string;
    const photo = "https://i.ibb.co/f8b9G3g/medicine5.jpg";
    const id = Date.now().toString();

    const payload =
      modalType === "create"
        ? { id, name, category, stock, price, suppliers, photo }
        : { name, category, stock, price };

    if (modalType === "create") {
      await createProduct(payload);
    } else {
      if (!productId) return;
      await updateProduct(productId, payload);
    }

    await refetchProducts();
    onClose();
  };

  const [value, setValue] = useState(selectedProduct?.category ?? "Medicine");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <h2 className={css.modalTitle}>
        {modalType === "edit" ? "Edit product" : "Add product"}
      </h2>

      <form className={css.form} onSubmit={onSubmit}>
        <div className={css.inputsWrapper}>
          <div className={css.first_line_input_box}>
            <input
              className={css.input}
              type="text"
              name="name"
              defaultValue={selectedProduct?.name ?? ""}
              placeholder="Product name"
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
              defaultValue={selectedProduct?.stock ?? ""}
              placeholder="Stock"
            />
            {modalType === "create" && (
              <input
                className={css.input}
                type="text"
                name="suppliers"
                defaultValue=""
                placeholder="Suppliers"
              />
            )}
          </div>

          <input
            className={css.input}
            type="text"
            name="price"
            defaultValue={selectedProduct?.price ?? ""}
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
