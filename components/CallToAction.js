import styles from '../styles/cta.module.scss'
import Link from "next/link";
import FeatherIcon from "feather-icons-react";

export default function CallToAction({ section, index }) {
    return (
        <section className={styles.section}>
            <h2 className={styles.title}
                 style={index === 0 ? {border: 'none'} : {borderTop: '1px solid var(--main)'}}>
                {section.title}
            </h2>
            <div className={styles.link}>
                <Link href={section.link}>
                    <a>
                        {section.label}
                        <FeatherIcon
                            icon={section.icon}
                            size={21}
                            style={{ marginTop: '-8px'}}
                        />
                    </a>
                </Link>
            </div>
        </section>
    )
}