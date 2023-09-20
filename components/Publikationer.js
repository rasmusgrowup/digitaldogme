// Default imports
import Image from "next/image"
import Link from "next/link"
import {useEffect, useState} from 'react'
import Moment from 'react-moment'
import 'moment/locale/da';
import { useRouter} from "next/router";

// SCSS Styling
import styles from '../styles/publikationer.module.scss'

export default function Publikationer({ arr, types }) {
  const router = useRouter()
  const [ kategorier, setKategorier ] = useState(types.enumValues);
  const [ filter, setFilter ] = useState(router.query.param || kategorier);
  const [ filteredArr, setFilteredArr] = useState(kategorier)
  const [grid, setGrid] = useState(arr)
  const increaseBy = 8;
  const [itemsLoaded, setItemsLoaded] = useState(8);
  const count = {};

  arr.forEach((item) => {
    const { kategori } = item;
    count[kategori] = (count[kategori] || 0) + 1;
  });

  useEffect(() => {
    // Get the updated filter value from the route param
    const updatedFilter = router.query.param || kategorier;
    setFilter(updatedFilter);
  }, [router.query.param]);

  // Use useEffect to re-render the grid when the filter changes
  useEffect(() => {
    // Your logic to update the grid based on the new filter value.
    // For example, you could filter the 'arr' array based on the 'filter' value.
    // Then, update the filtered array to the grid state.
    let filteredArr;
    if (filter === kategorier) {
      filteredArr = arr;
    } else {
      filteredArr = arr.filter((publikation) => publikation.kategori === filter);
    }
    // Update the grid with the filtered array
    setGrid(filteredArr.slice(0, itemsLoaded));
    setFilteredArr(filteredArr)
  }, [filter, itemsLoaded]);

  return (
    <>
      <section className={styles.publikationer}>
        <div className={styles.inner}>
          { kategorier &&
            <div className={styles.filter}>
              <button className={`${styles.kategoriBtn} ${ filter === kategorier && `${styles.selected}`}`} onClick={() => setFilter(kategorier)}>
                Alle <sup>({arr.length})</sup>
              </button>
              { kategorier.map((kategori, i) => (
                <button key={i} className={`${styles.kategoriBtn} ${ kategori.name === filter && `${styles.selected}`}`} onClick={() => setFilter(kategori.name)}>
                  {
                    kategori.name === 'Nyhed' ?
                    'Nyheder' :
                    kategori.name === 'Whitepaper' ?
                    'Whitepapers' :
                    kategori.name === 'Analyse' ?
                    'Analyser' :
                    kategori.name === 'Debat' ?
                    'Debatindlæg' : null
                  }
                  {` `}{count[kategori.name] && <sup>({count[kategori.name]})</sup>}
                </button>
              )) }
            </div>
          }
          <div className={styles.grid}>
            { grid.map((publikation, i) => {
              return (
                <div className={styles.publikation} key={i}>
                  <Link href={types === 'null' ? `${`/cases/${publikation.slug}`}` : `${`/viden/${publikation.slug}`}`} key={i} passHref>
                    <a>
                      <div className={styles.wrapper}>
                        <Image
                            alt={publikation.billede.alt}
                            src={publikation.billede.url}
                            height='400'
                            width='400'
                            objectFit='cover'
                            objectPosition='center'
                            quality='100'
                            layout='responsive'
                        />
                      </div>
                      <h3 className={styles.titel}>{publikation.titel}</h3>
                      {/* <p className={styles.resume}>{publikation.resume}</p> */}
                      <span className={styles.dato}>
                        <Moment locale='da' format='ll'>
                            {publikation.dato.toString()}
                        </Moment>
                      </span>
                    </a>
                  </Link>
                </div>
              )})}
          </div>
          { itemsLoaded < arr.length &&
              <div className={styles.loaderBtn}>
                <button onClick={() => setItemsLoaded(itemsLoaded + increaseBy)}>Indlæs flere</button>
              </div>
          }
        </div>
      </section>
    </>
  )
}
