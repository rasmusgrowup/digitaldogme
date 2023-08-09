import styles from '../styles/row.module.scss'

export default function Row({ row }) {
    return (
        <div className={styles.row}>
            {row.rowTitle &&
                <header>
                    {row.rowTitle && <h3 className={styles.h3}>{row.rowTitle}</h3>}
                    {row.rowText && <div className={styles.rowText} dangerouslySetInnerHTML={{__html: `${row.rowText.html}`}}/>}
                </header>
            }
            <div className={styles.items}>
                {row.items && row.items.map((item, i) => (
                    <div key={i} className={styles.item}>
                        {item.title && <h4 className={styles.h4}>{item.title}</h4>}
                        {item.columnText && <p className={styles.p}>{item.columnText}</p>}
                    </div>
                ))}
            </div>
        </div>
    )
}