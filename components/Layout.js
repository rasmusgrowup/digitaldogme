// SCSS Styles
import styles from '../styles/layout.module.scss'

// Components
import Header from '../components/Header'

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className={styles.main}>{children}</main>
    </>
  )
}
