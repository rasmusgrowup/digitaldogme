// SCSS styles
import styles from '../styles/blocks.module.scss'

// Components
import Sektion from '../components/Sektion'
import Karussel from '../components/Karussel'
import Animeret from '../components/Animeret'
import Partners from '../components/Partners'
import Team from '../components/Team'
import Usp from '../components/Usp'

export default function Blocks({ blokke }) {
  return (
    <>
      <div className={styles.content}>
      { blokke.map((blok, i) => (
          blok.__typename === 'Sektion' ?
          <Sektion arr={blok} key={blok.id}/> :
          blok.__typename === 'Animeret' ?
          <Animeret arr={blok} key={blok.id}/> :
          blok.__typename === 'Partner' ?
          <Partners arr={blok} key={blok.id}/> :
          blok.__typename === 'Karussel' ?
          <Karussel arr={blok} key={blok.id}/> :
          blok.__typename === 'Team' ?
          <Team arr={blok} key={blok.id}/> :
          blok.__typename === 'USP' ?
          <Usp arr={blok} key={blok.id}/> :
          null
        )) }
      </div>
    </>
  )
}
