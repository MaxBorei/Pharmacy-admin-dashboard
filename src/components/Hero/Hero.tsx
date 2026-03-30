import css from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={css.hero} aria-label="Hero">
      <div className={css.hero_label_container}>
        <img
          className={css.hero_img_label}
          src="/Mask group.webp"
          alt="medicine label"
        />
        <h2 className={css.hero_title_label}>E-Pharmacy</h2>
      </div>
      <h1 className={css.hero_title}>
        Your medication, delivered Say goodbye to all{" "}
        <span className={css.hero_span}>your healthcare</span> worries with us
      </h1>
      <img
        className={css.hero_img_title}
        src="/white round pill.webp"
        alt="white round pill"
      />
    </section>
  );
}
