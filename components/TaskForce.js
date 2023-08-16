import styles from '../styles/taskforce.module.scss'
import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import Image from "next/image";

export default function TaskForce({section, theme, index}) {
    let currentYear = new Date().getFullYear();
    console.log(section.events)
    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                <div className={styles.content}>
                    <div className={styles.richText} dangerouslySetInnerHTML={{__html: `${section.content.html}`}}/>
                    {/* <div className={styles.persons}>
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
                    </div> */}
                </div>
                <div className={`
                    ${styles.info}
                    ${theme === 'sky' ? `${styles.sky}` : theme === 'blue' ? `${styles.blue}` : theme === 'light' ? `${styles.light}` : theme === 'curry' ? `${styles.curry}` : theme === 'turquoise' ? `${styles.turquoise}` : theme === 'grey' ? `${styles.grey}` : theme === 'green' ? `${styles.green}` : theme === 'sand' ? `${styles.sand}` : `${styles.dark}`}
                    `}>
                    {section.events.length > 0 &&
                        <div className={styles.events}>
                            <p><strong>Relaterede events</strong></p>
                            {section.events.map((e, i) => (
                                <Link key={i} href={`/${e.slug}`}><a className={styles.link}>{e.titel}<FeatherIcon icon={'arrow-up-right'} strokeWidth={'1.5'} size={'14'}/></a></Link>
                            ))}
                        </div>
                    }
                    <div className={styles.richText} dangerouslySetInnerHTML={{__html: `${section.information.html}`}}/>
                </div>
            </div>
        </section>
    )
}