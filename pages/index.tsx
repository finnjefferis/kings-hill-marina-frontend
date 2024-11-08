import Link from "next/link";
import { FC } from "react";
import styles from "../styles/Home.module.css"; // Adjusted path

const Home: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Welcome to Kings Hill Marina</h1>
        <nav>
          <ul className={styles.navList}>
            <li>
              <Link href="/owners">
                <button className={styles.button}>Manage Owners</button>
              </Link>
            </li>
            <li>
              <Link href="/boats">
                <button className={styles.button}>Manage Boats</button>
              </Link>
            </li>
            <li>
              <Link href="/berths">
                <button className={styles.button}>View Berths</button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Home;
