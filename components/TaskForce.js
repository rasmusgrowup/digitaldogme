import styles from '../styles/taskforce.module.scss'
import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import Image from "next/image";

export default function TaskForce({section, theme, index}) {
    let currentYear = new Date().getFullYear();
    return (
        <section className={styles.section}>
            <div className={`
                ${styles.info}
                ${theme === 'blue' ? `${styles.blue}` : theme === 'light' ? `${styles.light}` : theme === 'curry' ? `${styles.curry}` : theme === 'turquoise' ? `${styles.turquoise}` : theme === 'grey' ? `${styles.grey}` : theme === 'green' ? `${styles.green}` : theme === 'sand' ? `${styles.sand}` : `${styles.dark}`}
                `}>
                <div className={styles.inner}>
                    {section.events &&
                        <div className={styles.events}>
                            <p><strong>Relaterede events</strong></p>
                            {section.events.map((e, i) => (
                                <Link key={i} href={`/${e.slug}`}><a>{e.titel}<FeatherIcon icon={'arrow-up-right'} strokeWidth={'1.5'} size={'14'}/></a></Link>
                            ))}
                        </div>
                    }
                    <div className={styles.outcome}>
                        <p><strong>Indsatser ({currentYear} / {currentYear + 1})</strong></p>
                        <ul>
                            <li>Identificere fællesnævnere og principper for vellykkede tiltag og projekter inden for cybersikkerhedsopkvalificering og digitale kompetencer.</li>
                            <li>Udvikle anbefalinger og strategier baseret på denne erfaringsdeling, der kan tilpasses og implementeres i dansk erhvervsliv.</li>
                            <li>Facilitere partnerskaber og samarbejde mellem store virksomheder, universiteter i hele kompetenceforsyningskæden med fokus på digitale kompetencer.</li>
                            <li>Fremme videnoverførsel og samarbejde mellem virksomheder og uddannelsesinstitutioner for at styrke udviklingen af digitale kompetencer.</li>
                        </ul>
                    </div>
                    <div className={styles.goals}>
                        <p><strong>Mål & outcome (årligt)</strong></p>
                        <ul>
                            <li>1-2 årlige white papers, analyser, toolkits eller policy anbefalinger </li>
                            <li>1-2 fælles projekt(er)</li>
                            <li>10-12 cases med inspiration til digitale opkvaliceringsindsatser </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.richText} dangerouslySetInnerHTML={{__html: `${section.content.html}`}}/>
                <div className={styles.persons}>
                    <p><strong>Facilitatorer</strong></p>
                    {section.personer.map((person, i) => (
                        <div className={styles.person} key={i}>
                            <Image src={person.billedePerson.url}
                                   height={'260'}
                                   width={'260'}
                                   objectFit={'cover'}
                                   objectPosition={'top'}
                                   alt={person.billedePerson.alt}
                            />
                            <div>{person.navn}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}