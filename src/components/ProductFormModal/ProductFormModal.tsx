import { updateProduct } from "../../lib/products";
import type { ProductDataItem } from "../../lib/types/Products";
import css from "./ProductFormModal.module.css";

type ProductFormModalProps = {
  modalType: "create" | "edit";
  selectedProduct: ProductDataItem | null;
  onClose: () => void;
  refetchProducts: () => Promise<void>;
};

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
    if (!productId) return;
    const payload = { name, category, stock, price };
    await updateProduct(productId, payload);
    await refetchProducts();
    onClose();
  };
  return (
    <div>
      <h2 className={css.modalTitle}>
        {modalType === "edit" ? "Edit product" : "Add product"}
      </h2>

      <form className={css.form} onSubmit={onSubmit}>
        <div className={css.inputsWrapper}>
          <input
            className={css.input}
            type="text"
            name="name"
            defaultValue={selectedProduct?.name ?? ""}
            placeholder="Product name"
          />

          <select
            className={css.select}
            name="category"
            defaultValue={selectedProduct?.category ?? "Medicine"}
          >
            <option value="Medicine">Medicine</option>
            <option value="Heart">Heart</option>
            <option value="Head">Head</option>
            <option value="Hand">Hand</option>
            <option value="Leg">Leg</option>
          </select>

          <input
            className={css.input}
            type="text"
            name="stock"
            defaultValue={selectedProduct?.stock ?? ""}
            placeholder="Stock"
          />

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
