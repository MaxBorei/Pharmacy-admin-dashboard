import css from "./Hero.module.css";

export const Hero = () => {
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
          <div className={css.hero_container_input}>
            <form className={css.hero_form}>
              <div className={css.hero_container_input}>
                <input
                  type="email"
                  placeholder="Email adress"
                  autoComplete="email"
                  inputMode="email"
                  className={css.hero_input}
                />
                <input
                  className={css.hero_input}
                  type="password"
                  placeholder="Password"
                />
              </div>
              <button className={css.hero_input_btn} type="submit">
                Log in
              </button>
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
