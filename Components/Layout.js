import NavbarComponent from './NavbarComponent';
import styles from '../styles/Home.module.css'

export default function Layout ({children}) {
  return (
      <>
        <NavbarComponent/>
        <main className={styles.main}> {children}</main>
      </>
  )
}
