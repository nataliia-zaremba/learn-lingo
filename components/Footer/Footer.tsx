import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* верхня частина футера */}
      <div className={styles.container}>
        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.logo}>LearnLingo</div>
          <p className={styles.description}>
            Unlock your potential with the best language tutors.
          </p>
        </div>

        {/* Navigation */}
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li>
              <a href="/home">Home</a>
            </li>
            <li>
              <a href="/teachers">Teachers</a>
            </li>
          </ul>
        </nav>

        {/* Auth */}
        <div className={styles.auth}>
          <button className={styles.login}>Log in</button>
          <button className={styles.register}>Registration</button>
        </div>
      </div>

      {/* нижня частина */}
      <div className={styles.bottom}>
        © 2025 LearnLingo. All rights reserved.
      </div>
    </footer>
  );
}
