/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['media.graphassets.com', 'media.graphcms.com']
  },
    experimental: {
    workerThreads: false,
    cpus: 1
  },
  async redirects() {
    return [
      {
        source: '/hvem-er-vi',
        destination: '/om-os',
        permanent: true
      },
      {
        source: '/digital-upskilling-landscape',
        destination: '/',
        permanent: true
      },
      {
        source: '/hvem-er-vi/medarbejdere',
        destination: '/om-os',
        permanent: true
      },
      {
        source: '/hvem-er-vi/bestyrelsen',
        destination: '/om-os',
        permanent: true
      },
      {
        source: '/viden-ressourcer',
        destination: '/viden',
        permanent: true
      },
      {
        source: '/medlemskab',
        destination: '/bliv-medlem',
        permanent: true
      },
      {
        source: '/tilmelding-til-danmarks-digitale-kompetencer',
        destination: '/om-os',
        permanent: true
      },
      {
        source: '/tilmel-dig-vores-nyhedsbrev',
        destination: '/om-os',
        permanent: true
      },
      {
        source: '/tilmel-dig-vores-nyhedsbrev',
        destination: '/om-os',
        permanent: true
      },
      {
        source: '/generalforsamlinger',
        destination: '/om-os',
        permanent: true
      },
      {
        source: '/viden/tryg-gar-efter-skyen-og-medarbejderne-skal-med',
        destination: '/cases/tryg-gar-efter-skyen-og-medarbejderne-skal-med',
        permanent: true
      },
      {
        source: '/viden/opkvalificering-bor-tages-seriost',
        destination: '/cases/opkvalificering-bor-tages-seriost',
        permanent: true
      },
      {
        source: '/viden/koncern-it',
        destination: '/cases/koncern-it',
        permanent: true
      },
      {
        source: '/viden/kobenhavns-lufthavn',
        destination: '/cases/kobenhavns-lufthavn',
        permanent: true
      },
      {
        source: '/viden/det-digitale-kompetencebarometer',
        destination: '/',
        permanent: false
      }
    ]
  }
}

module.exports = nextConfig
