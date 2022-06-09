import Head from 'next/head'
import Image from 'next/image'

//GraphCMS
import { GraphQLClient, gql } from 'graphql-request';

const graphcms = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT)

// SCSS styles
import styles from '../styles/main.module.scss'

export async function getStaticProps() {
  const { sider } = await graphcms.request(`
    query MyQuery {
      sider(where: {type: forside}, first: 1) {
        type
        id
        titel
      }
    }
  `);

  return {
    props: {
      sider
    }
  }
}

export default function Home({ sider }) {
  console.log({ sider })
  return (
    <>
      <section style={{ paddingTop : '5rem' }}>
        <h1>{sider.titel}</h1>
      </section>
    </>
  )
}
