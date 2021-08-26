import NavbarComponent from './NavbarComponent';
import styles from '../styles/Home.module.css';
import FooterComponent from './FooterComponent';

export default function Layout({children}) {
  return (
      <>
        <div className={styles.background} style={{height: '100%', width: '100%'}}>
          <NavbarComponent/>
          <main className={styles.main}>{children}</main>
          <FooterComponent/>
        </div>
      </>
  );
}
