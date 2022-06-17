/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['media.graphassets.com', 'media.graphcms.com'],
  },
  async redirects() {
    return [
      {
        source: '/hvem-er-vi',
        destination: '/om-os',
        permanent: true,
      },
      {
        source: '/digital-upskilling-landscape',
        destination: '/',
        permanent: true,
      },
      {
        source: '/hvem-er-vi/medarbejdere',
        destination: '/om-os',
        permanent: true,
      },
      {
        source: '/hvem-er-vi/bestyrelsen',
        destination: '/om-os',
        permanent: true,
      },
      {
        source: '/viden-ressourcer',
        destination: '/viden',
        permanent: true,
      },
      {
        source: '/medlemskab',
        destination: '/bliv-medlem',
        permanent: true,
      },
      {
        source: '/tilmelding-til-danmarks-digitale-kompetencer',
        destination: '/om-os',
        permanent: true,
      },
      {
        source: '/tilmel-dig-vores-nyhedsbrev',
        destination: '/om-os',
        permanent: true,
      },
      {
        source: '/tilmel-dig-vores-nyhedsbrev',
        destination: '/om-os',
        permanent: true,
      },
      {
        source: '/generalforsamlinger',
        destination: '/om-os',
        permanent: true,
      }
    ]
  }
}

module.exports = nextConfig
