// SCSS styles
import styles from '../styles/blocks.module.scss'

// Components
import Sektion from '../components/Sektion'
import Karussel from '../components/Karussel'
import Animeret from '../components/Animeret'
import Partners from '../components/Partners'
import Team from '../components/Team'
import Usp from '../components/Usp'
import Grid from "./Grid";
import Section from "./Section";
import Testimonial from "../components/Testimonial";
import CallToAction from "./CallToAction";

export default function Blocks({ blokke }) {
  return (
    <>
      <div className={styles.content}>
          { blokke && blokke.map((blok, i) => {
              switch (blok.__typename) {
                  case 'Sektion': return <Sektion arr={blok} key={blok.id} index={i}/>
                  case 'Animeret': return <Animeret arr={blok} key={blok.id} index={i}/>
                  case 'Partner': return <Partners arr={blok} index={i} key={blok.id}/>
                  case 'Karussel': return <Karussel arr={blok} key={blok.id}/>
                  case 'Team': return <Team arr={blok} key={blok.id}/>
                  case 'USP': return <Usp arr={blok} key={blok.id}/>
                  case 'Grid': return <Grid props={blok} index={i} key={blok.id}/>
                  case 'Section': return <Section section={blok} index={i} key={blok.id}/>
                  case 'Testimonial': return <Testimonial section={blok} index={i} key={blok.id}/>
                  case 'CallToAction': return <CallToAction section={blok} index={i} key={blok.id}/>
                  default: return <></>
              }
          })}
      </div>
    </>
  )
}
