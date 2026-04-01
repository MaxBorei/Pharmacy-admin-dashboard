import { useNavigate } from "react-router-dom";
import css from "./Hero.module.css";
import { login } from "../../lib/auth";
import { useState } from "react";
import Loader from "../Loader/Loader";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../schemas/loginSchema";

type FormData = {
  email: string;
  password: string;
};

export const Hero = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema),
  });
  const handleFillDemo = () => {
    setValue("email", "user@gmail.com", {
      shouldValidate: true,
      shouldDirty: true,
    });

    setValue("password", "123456789", {
      shouldValidate: true,
      shouldDirty: true,
    });
  };
  const onSubmit = async (data: FormData) => {
    const email = data.email;
    const password = data.password;
    setErrorMessage("");
    try {
      setIsLoading(true);
      const response = await login({ email, password });
      localStorage.setItem("accessToken", response.data.accessToken);
      navigate("/dashboard");
    } catch {
      setErrorMessage("Invalid email or password");
    } finally {
      setIsLoading(false);
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
            <form className={css.hero_form} onSubmit={handleSubmit(onSubmit)}>
              {isLoading && <Loader />}
              <div className={css.hero_container_input}>
                <div className="hero_field_input">
                  <input
                    {...register("email", {
                      required: "Email Address is required",
                    })}
                    type="email"
                    placeholder="Email address"
                    autoComplete="email"
                    inputMode="email"
                    className={css.hero_input}
                    disabled={isLoading}
                  />
                  <div className="hero_container_error">
                    <p className={css.hero_error_message}>
                      {errors.email?.message}
                    </p>
                  </div>
                </div>
                <div className="hero_field_input">
                  <input
                    {...register("password", {
                      required: "Password is required",
                    })}
                    className={css.hero_input}
                    type="password"
                    placeholder="Password"
                    disabled={isLoading}
                  />
                  <div className="hero_container_error">
                    <p className={css.hero_error_message}>
                      {errors.password?.message}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <button
                    className={css.hero_input_btn}
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Wait..." : "Log in"}
                  </button>
                  <div className="hero_container_error">
                    {errorMessage && (
                      <p className={css.hero_error_message}>{errorMessage}</p>
                    )}
                  </div>
                </div>
                <button
                  className={css.hero_demo_btn}
                  type="button"
                  onClick={handleFillDemo}
                  disabled={isLoading}
                >
                  Use demo account
                </button>
              </div>
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
