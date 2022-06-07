// Default imports
import { useRouter } from 'next/router'

// SCSS styles
import styles from '../styles/button.module.scss'

export default function Button({ label, href }) {
  const router = useRouter()

  return (
    <>
      <button
        type='button'
        className={styles.button}
        onClick={() => router.push(`/${href}`)}
      >
        {label}
      </button>
    </>
  )
}
