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
import BackgroundSection from "./BackgroundSection";
import TaskForce from "./TaskForce";

export default function Blocks({blokke, withHero, theme}) {

    return (
        <>
            <div className={styles.content}>
                {blokke && blokke.map((blok, i) => {
                    let shouldHaveLine = false;
                    let previousBlok = blokke[i - 1];

                    if (i > 0 && previousBlok.__typename === 'Grid') {
                        shouldHaveLine = !previousBlok.gridTheme;
                    } else if (i > 0 && previousBlok.__typename === 'Section') {
                        shouldHaveLine = !previousBlok.sectionTheme;
                    } else if (i > 0 && previousBlok.__typename === 'BackgroundSection') {
                        shouldHaveLine = false;
                    } else {
                        shouldHaveLine = true;
                    }

                    switch (blok.__typename) {
                        case 'Sektion':
                            return <Sektion arr={blok} key={blok.id} index={i} shouldHaveLine={shouldHaveLine}/>
                        case 'Animeret':
                            return <Animeret arr={blok} key={blok.id} index={i} shouldHaveLine={shouldHaveLine}/>
                        case 'Partner':
                            return <Partners arr={blok} index={i} key={blok.id} shouldHaveLine={shouldHaveLine}/>
                        case 'Karussel':
                            return <Karussel arr={blok} key={blok.id} shouldHaveLine={shouldHaveLine}/>
                        case 'Team':
                            return <Team arr={blok} key={blok.id} shouldHaveLine={shouldHaveLine}/>
                        case 'USP':
                            return <Usp arr={blok} key={blok.id} shouldHaveLine={shouldHaveLine}/>
                        case 'Grid':
                            return <Grid props={blok} index={i} key={blok.id} shouldHaveLine={shouldHaveLine}/>
                        case 'Section':
                            return <Section section={blok} index={i} key={blok.id} topSection={withHero} shouldHaveLine={shouldHaveLine}/>
                        case 'Testimonial':
                            return <Testimonial section={blok} index={i} key={blok.id} shouldHaveLine={shouldHaveLine}/>
                        case 'CallToAction':
                            return <CallToAction section={blok} index={i} key={blok.id} shouldHaveLine={shouldHaveLine}/>
                        case 'BackgroundSection':
                            return <BackgroundSection section={blok} index={i} key={blok.id} shouldHaveLine={shouldHaveLine}/>
                        case 'TaskForce':
                            return <TaskForce section={blok} theme={theme} index={i} key={blok.id} shouldHaveLine={shouldHaveLine}/>
                        default:
                            return <></>
                    }
                })}
            </div>
        </>
    )
}
