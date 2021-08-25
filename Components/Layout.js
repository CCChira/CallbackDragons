import NavbarComponent from './NavbarComponent';
import styles from '../styles/Home.module.css';
import FooterComponent from './FooterComponent';

export default function Layout({children}) {
  return (
      <>
        <NavbarComponent/>
        <main className={styles.main}>{children}</main>
        <FooterComponent/>
      </>
  );
}
