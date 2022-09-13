// Default imports
import Image from "next/image";
import Link from "next/link";
import Moment from 'react-moment';
import 'moment/locale/da';
import React, {useState} from 'react';

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
const graphcms = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT)

export async function getStaticProps({ params }) {
  const data = await graphcms.request(`
    query case($slug: String!) {
      case(where: {slug: $slug}) {
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
      }
    }
  `, {
    slug: params.slug
  });

  return {
    props: {
      data
    }
  }
}

export async function getStaticPaths() {
  const { cases } = await graphcms.request(`
    {
      cases {
        slug
      }
    }
  `);

  return {
    paths: cases.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: false,
  }
}

export default function Case({data}) {

  return (
    <>
      <Hero
        height={true}
        url={data.case.billede.url}
        overskrift={data.case.titel}
        tekst={data.case.resume}
        alt={data.case.billede.alt}
      />
      <section className={styles.richWrapper}>
        <div className={styles.richInner}>
          <span className={styles.tilbage}>
            <Link href='/cases'>
              <a>
                <FeatherIcon
                  className={styles.ikon}
                  icon='chevron-left'
                  size={10} style={{ color: 'red' }} />
                Tilbage til oversigten
              </a>
            </Link>
          </span>
          <div className={styles.info}>
            <span>
              <Moment locale='da' format='ll'>
                {data.case.dato.toString()}
              </Moment>
            </span>
            <span>{data.case.kategori}</span>
            <span>{data.case.titel}</span>
          </div>
          <h2>
            {data.case.resume}
          </h2>
          <div
            className={styles.rich}
            dangerouslySetInnerHTML={{ __html: `${data.case.indhold.html}` }}
          >
          </div>
        </div>
      </section>
    </>
  )
}
