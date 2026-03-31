import { useNavigate } from "react-router-dom";
import css from "./Hero.module.css";
import { login } from "../../lib/auth";
import { useState } from "react";

export const Hero = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;
    setErrorMessage("");
    try {
      const response = await login({ email, password });

      localStorage.setItem("accessToken", response.data.accessToken);

      navigate("/dashboard");
    } catch {
      setErrorMessage("Invalid email or password");
    }
  };

  return (
    <section className={css.hero} aria-label="Hero">
      <div className={css.hero_inner}>
        <div className={css.hero_container_label}>
          <img
            className={css.hero_img_label}
            src="/Mask group.webp"
            alt="medicine label"
          />
          <h2 className={css.hero_title_label}>E-Pharmacy</h2>
        </div>
        <div className={css.hero_container_content}>
          <div className={css.hero_container_title}>
            <h1 className={css.hero_title}>
              Your medication, delivered Say goodbye to all{" "}
              <span className={css.hero_span}>your healthcare</span> worries
              with us
            </h1>
            <img
              className={css.hero_img_title}
              src="/white round pill.webp"
              alt="white round pill"
            />
          </div>
          <div className={css.hero_container_form}>
            <form className={css.hero_form} onSubmit={handleSubmit}>
              <div className={css.hero_container_input}>
                <input
                  name="email"
                  type="email"
                  placeholder="Email address"
                  autoComplete="email"
                  inputMode="email"
                  className={css.hero_input}
                />
                <input
                  name="password"
                  className={css.hero_input}
                  type="password"
                  placeholder="Password"
                />
              </div>
              <button className={css.hero_input_btn} type="submit">
                Log in
              </button>
              {errorMessage && <p className={css.hero_error}>{errorMessage}</p>}
            </form>
          </div>
        </div>
      </div>
      <div className={css.hero_container_img_graf}>
        <img
          className={css.hero_derstive_img_1}
          src="/Rectangle 42213.png"
          alt="decorative background shapes"
        />
        <img
          className={css.hero_derstive_img_2}
          src="/Rectangle 42213.png"
          alt="decorative background shapes"
        />
        <img
          className={css.hero_derstive_img_3}
          src="/Rectangle 42213.png"
          alt="decorative background shapes"
        />
      </div>
    </section>
  );
};
