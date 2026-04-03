import { useState } from "react";
import { logout } from "../../lib/auth";
import css from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

export const Header = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await logout();
    } catch (err) {
      console.error(err);
    } finally {
      localStorage.removeItem("accessToken");
      navigate("/login");
      setIsLoading(false);
    }
  };
  return (
    <div className={css.Header_section}>
      {isLoading && <Loader />}
      <div className={css.Header_container_log}>
        <img
          className={css.Header_img_label}
          src="/Mask group.webp"
          alt="medicine label"
        />
      </div>
      <div className={css.Header_container_content}>
        <div className={css.Header_container_content_box}>
          <div className={css.Header_container_content_title}>
            <h2 className={css.Header_title}>Medicine store</h2>
          </div>
          <div className={css.Header_container_content_text}>
            <p className={css.Header_content_text}>Dasboard</p>
            <svg className={css.Header_content_line}>
              <use href="/sprite.svg#icon-Vector-46"></use>
            </svg>
            <p className={css.Header_content_text}>vendor@gmail.com</p>
          </div>
        </div>
        <button
          className={css.Header_container_img_logout}
          type="button"
          onClick={handleLogout}
          disabled={isLoading}
        >
          <svg className={css.Header_svg_logout}>
            <use href="/sprite.svg#icon-majesticons_logout"></use>
          </svg>
        </button>
      </div>
    </div>
  );
};
