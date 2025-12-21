import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className="container">
      <div className={styles.hero}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Unlock your potential with the best <span>language</span> tutors
          </h1>

          <p className={styles.text}>
            Embark on an exciting language journey with expert language tutors.
            Elevate your language proficiency to new heights by connecting with
            highly qualified and experienced tutors.
          </p>

          <button className={styles.button}>Get started</button>
        </div>

        <div className={styles.imageWrapper}>
          <img src="/images/hero-image.png" alt="Hero" />
        </div>
      </div>
    </section>
  );
}
