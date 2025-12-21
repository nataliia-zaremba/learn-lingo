import styles from "./Stats.module.css";

export default function Stats() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.stats}>
          <ul className={styles.list}>
            <li className={styles.item}>
              <span className={styles.value}>32,000+</span>
              <span className={styles.label}>
                <span>Experienced</span>
                <span>tutors</span>
              </span>
            </li>

            <li className={styles.item}>
              <span className={styles.value}>300,000+</span>
              <span className={styles.label}>
                <span>5-star tutor</span>
                <span>reviews</span>
              </span>
            </li>

            <li className={styles.item}>
              <span className={styles.value}>120+</span>
              <span className={styles.label}>
                <span>Subjects</span>
                <span>taught</span>
              </span>
            </li>

            <li className={styles.item}>
              <span className={styles.value}>200+</span>
              <span className={styles.label}>
                <span>Tutor</span>
                <span>nationalities</span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
