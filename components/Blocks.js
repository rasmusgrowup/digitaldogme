// SCSS styles
import styles from '../styles/blocks.module.scss'

// Components
import Sektion from '../components/Sektion'
import Karussel from '../components/Karussel'
import Animeret from '../components/Animeret'

export default function Blocks({ blokke }) {
  return (
    <>
      <div className={styles.content}>
      { blokke.map((blok, i) => (
          blok.__typename === 'Sektion' ?
          <Sektion arr={blok} key={blok.id}/> :
          blok.__typename === 'Animeret' ?
          <Animeret arr={blok} key={blok.id}/> :
          blok.__typename === 'Karussel' ?
          <Karussel arr={blok} key={blok.id}/> :
          blok.__typename === 'USP' ?
          <></> :
          null
        )) }
      </div>
    </>
  )
}