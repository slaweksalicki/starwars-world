import styles from "./Header.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>
        <Link href="/">Star Wars World</Link>
      </h1>
    </header>
  );
};

export default Header;
