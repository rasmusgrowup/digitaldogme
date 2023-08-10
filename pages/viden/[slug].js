// Default imports
import Image from "next/image"
import Link from "next/link"
import Moment from 'react-moment'
import 'moment/locale/da';

//Components
import Hero from '../../components/Hero'

// Feather icons
import FeatherIcon from 'feather-icons-react';

// SCSS Styling
import styles from '../../styles/publikationer.module.scss'

// Framer motion
import { motion } from 'framer-motion';

//GraphCMS
import { GraphQLClient, gql } from 'graphql-request';
import {getMenu} from "../../lib/hygraph";
import Layout from "../../components/Layout";
import {useRouter} from "next/router";
const graphcms = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT)

export async function getStaticProps({ params }) {
  const { publikation } = await graphcms.request(`
    query publikation($slug: String!) {
      publikation(
        where: {slug: $slug}
        ) {
        id
        slug
        titel
        resume
        billede {
          alt
          url
        }
        dato
        indhold {
          html
        }
        kategori
        pdf {
          url
          fileName
        }
      }
    }
  `, {
    slug: params.slug
  });
  const menu = await getMenu("dev")

  return {
    props: {
      publikation,
      menu
    }
  }
}

export async function getStaticPaths() {
  const { publikationer } = await graphcms.request(`
    {
      publikationer {
        slug
      }
    }
  `);

  return {
    paths: publikationer.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: false,
  }
}

export default function Publikation({ publikation, menu }) {
  const router = useRouter();

  return (
    <Layout menu={menu} hasHero='true' key={publikation.id} theme={'light'}>
      <Hero
        height={true}
        url={publikation.billede.url}
        overskrift={publikation.titel}
        tekst={publikation.resume}
        alt={publikation.billede.alt}
        theme={'light'}
      />
      <section className={styles.richWrapper}>
        <div className={styles.info}>
          <span className={styles.tilbage} onClick={router.back}>
              Tilbage til oversigten
          </span>
          <Moment locale='da' format='ll'>
            {publikation.dato.toString()}
          </Moment>
        </div>
        <div className={styles.richInner}>
          <h2>
            {publikation.resume}
          </h2>
          <div
            className={styles.rich}
            dangerouslySetInnerHTML={{ __html: `${publikation.indhold.html}` }}
          >
          </div>
          { publikation.pdf.map((pdf, i) => (
            <Link href={pdf.url} passHref key={i}>
              <a target='_blank'>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98}}
                  className={styles.pdfLink}>
                  <span>{pdf.fileName}</span>
                  <span>Læs</span>
                </motion.div>
              </a>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  )
}
