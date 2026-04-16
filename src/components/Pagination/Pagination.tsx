import clsx from "clsx";
import css from "./Pagination.module.css";

type PaginationType = {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
};

export const Pagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
}: PaginationType) => {
  const pages = totalPages
    ? Array.from({ length: totalPages }, (_, i) => i + 1)
    : [];
  return (
    <div className={css.order_pagination_container}>
      {pages.map((i) => (
        <button
          key={i}
          className={clsx(
            css.order_pagination_btn,
            currentPage === i && css.active,
          )}
          type="button"
          onClick={() => setCurrentPage(i)}
        >
          <svg className={css.order_pagination_svg}>
            <use href="/sprite.svg#icon-dot"></use>
          </svg>
        </button>
      ))}
    </div>
  );
};
