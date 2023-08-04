// Default imports
import { useRouter } from 'next/router'

// SCSS styles
import styles from '../styles/button.module.scss'

export default function Button({ label, href, theme }) {
  const router = useRouter()

  return (
    <>
      <button
        type='button'
        className={`${styles.button} ${ theme === 'light' && `${styles.light}`}`}
        onClick={ href ? `${() => router.push(`${href}`)}` : null}
      >
        {label}
      </button>
    </>
  )
}
