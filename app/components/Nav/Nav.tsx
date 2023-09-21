import styles from "./Nav.module.css";
import Link from "next/link";

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <Link href="/characters">Characters</Link>
      <Link href="/vehicles">Vehicles</Link>
      <Link href="/planets">Planets</Link>
    </nav>
  );
};

export default Nav;
