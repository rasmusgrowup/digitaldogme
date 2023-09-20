import styles from "../styles/title.module.scss";

export default function Title({section, index, shouldHaveLine}) {
    return (
        <section className={styles.titleWrapper}>
            <header style={index === 0 || !shouldHaveLine ? {border: 'none'} : {borderTop: '1px solid var(--main)'}}>
                {section.titleText && <h2 className={styles.titleText} style={section.maxWidth ? {maxWidth: '900px'} :{maxWidth: 'auto'}}>{section.titleText}</h2>}
            </header>
        </section>
    )
}