import css from "./Filter.module.css";

type FilterType = {
  inputValue: string;
  setInputValue: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export const Filter = ({ inputValue, setInputValue, onSubmit }: FilterType) => {
  return (
    <form onSubmit={onSubmit} className={css.form_filter}>
      <input
        className={css.input_filter}
        type="text"
        placeholder="User Name"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button className={css.btn_filter} type="submit">
        <svg className={css.btn_svg}>
          <use href="/sprite.svg#icon-filter"></use>
        </svg>
        Filter
      </button>
    </form>
  );
};
