async function fetchAPI(query, {variables, preview} = {}) {
    const res = await fetch(process.env.HYGRAPH_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${
                preview || process.env.NODE_ENV === 'development'
                    ? process.env.STAGE_TOKEN
                    : process.env.PROD_TOKEN
            }`,
        },
        body: JSON.stringify({
            query,
            variables,
        }),
    })
    const json = await res.json()

    if (json.errors) {
        console.error(json.errors)
        throw new Error('Failed to fetch API')
    }

    return json.data
}

export async function getPreviewCaseBySlug(slug) {
    const data = await fetchAPI(
        `
    query cases($slug: String!, $stage: Stage!) {
      case(where: {slug: $slug}, stage: $stage) {
        slug
      }
    }`,
        {
            preview: true,
            variables: {
                stage: 'DRAFT',
                slug,
            },
        }
    )
    return data.case
}

export async function getAllCasesWithSlug() {
    const data = await fetchAPI(`
    {
      cases {
        slug
      }
    }
  `)
    return data.cases
}

export async function getAllCases() {
    const data = await fetchAPI(
        `
    {
      cases(orderBy: dato_DESC) {
        __typename
        id
        slug
        titel
        resume
        billede {
          alt
          url
        }
        dato
        faktabox {
          titel
          tekst {
            html
          }
        }
        indhold {
          html
        }
      }
    }
  `)
    return data.cases
}

export async function getCaseBySlug(slug) {
    const data = await fetchAPI(
        `
    query cases($slug: String!, $stage: Stage!) {
      case(
        stage: $stage,
        where: {slug: $slug}
      ) {
        id
        slug
        titel
        resume
        billede {
            id
            alt
            url
            height
            width
        }
        dato
        faktabox {
          titel
          tekst {
            html
          }
        }
        indhold {
          html
        }
        originates {
            titel
            slug
        }
      }
    }
  `,
        {
            variables: {
                stage: process.env.NODE_ENV === 'development' ? 'DRAFT' : 'PUBLISHED',
                slug,
            },
        }
    )
    return data
}

export async function getLatestCases (slug) {
    const data = await fetchAPI(
        `
    query cases($slug: String!) {
        cases(
            orderBy: dato_DESC,
            first: 4,
            where: {slug_not: $slug}
          ) {
            id
            slug
            titel
            resume
            billede {
                id
                alt
                url
                height
                width
            }
            dato
            faktabox {
              titel
              tekst {
                html
              }
            }
            indhold {
              html
            }
        }
    }
  `, {
            variables: {
                slug
            }
        })
    return data.cases
}

export async function getLatestCase() {
    const data = await fetchAPI(`
        query case {
            cases(where: {slug: "lundbeck-opkvalificering-og-uddannelse-af-digitale-specialister"}) {
                id
                resume
                slug
                titel
                billede {
                    url
                    height
                    width
                }
            }
        }
    `)
    return data;
}

export async function getAllPublications() {
    const data = await fetchAPI(
        `
    {
      publikationer(
        orderBy: dato_DESC
      ) {
        __typename
        id
        billede {
          id
          height
          url
          width
        }
        dato
        kategori
        resume
        slug
        titel
      }
    }
  `)
    return data.publikationer
}

export async function getPublicationBySlug(slug) {
    const data = await fetchAPI(
        `
        query publikation($slug: String!, $stage: Stage!) {
          publikation(
            stage: $stage,
            where: {slug: $slug}
            )
            {
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
                cases {
                    titel
                    slug
                }
            }
        }
  `,
        {
            variables: {
                stage: process.env.NODE_ENV === 'development' ? 'DRAFT' : 'PUBLISHED',
                slug,
            },
        }
    )
    return data
}

export async function getLatestPublications (slug) {
    const data = await fetchAPI(
        `
    query publikationer($slug: String!) {
        publikationer(
        orderBy: dato_DESC,
        first: 4,
        where: {slug_not: $slug}
      ) {
        __typename
        id
        billede {
          id
          height
          url
          width
        }
        dato
        kategori
        resume
        slug
        titel
      }
    }
  `, {
            variables: {
                slug
            }
        })
    return data.publikationer
}

export async function getAllPublicationTypes() {
    const data = await fetchAPI(`
        {
            __type(name: "Kategori") {
                enumValues {
                  name
                }
            }
        }
    `)
    return data.__type
}

export async function getAllEvents () {
    const data = await fetchAPI(
        `
    {
      events(orderBy: dato_DESC) {
        id
        billede {
          id
          height
          url
          width
        }
        type
        dato
        tidspunktStart
        tidspunktSlut
        titel
        resume
        lokation
        beskrivelse {
          html
        }
        slug
      }
    }
  `)
    return data.events
}

export async function getLatestEvents (slug) {
    const data = await fetchAPI(
        `
    query events($slug: String!) {
      events(orderBy: dato_DESC, first: 4, where: {slug_not: $slug}) {
        id
        billede {
          id
          height
          url
          width
        }
        type
        dato
        tidspunktStart
        tidspunktSlut
        titel
        resume
        lokation
        beskrivelse {
          html
        }
        slug
      }
    }
  `, {
            variables: {
                slug
            }
        })
    return data.events
}

export async function getAllEventTypes() {
    const data = await fetchAPI(`
        {
            __type(name: "Eventtype") {
                enumValues {
                  name
                }
            }
        }
    `)
    return data.__type
}

export async function getEventBySlug(slug) {
    return await fetchAPI(
        `
    query event($slug: String!, $stage: Stage!) {
      event(stage: $stage, where: {slug: $slug}) {
        id
        slug
        titel
        resume
        lokation
        billede {
          alt
          url
        }
        dato
        tidspunktStart
        tidspunktSlut
        beskrivelse {
          html
        }
        faktabox {
            titel
            tekst {
                html
            }
        }
        type
        attachedMedia {
          url
          fileName
        }
        register
        sektioner {
          id
          billede {
            alt
            caption
            id
            url
            width
            height
          }
          maxBredde
          topLine
          baggrundsfarve
          align
          titel
          tekst {
            html
          }
          cta {
            id
            ikon
            label
            link
            params
          }
        }
        personer {
            navn
            billedePerson {
                url
            }
            jobtitel
        }
      }
    }
  `,
        {
            variables: {
                stage: process.env.NODE_ENV === 'development' ? 'DRAFT' : 'PUBLISHED',
                slug,
            },
        }
    )
}

export async function getPageTopSection(slug) {
    const {side} = await fetchAPI(`
        query page($slug: String!, $stage: Stage!) {
            side(
                stage: $stage,
                where: {slug: $slug}
            ) {
            topSektion {
              ... on Hero {
                id
                height
                billede {
                  caption
                  alt
                  height
                  url
                  width
                }
                overskrift
                tekst
              }
            }
          }
        }
    `,
        {
            variables: {
                stage: process.env.NODE_ENV === 'development' ? 'DRAFT' : 'PUBLISHED',
                slug,
            },
        })
    return side
}

export async function getPage(slug) {
    const {side} = await fetchAPI(`
        query forside($slug: String!, $stage: Stage!) {
          side(where: {slug: $slug}, stage: $stage) {
            id
            slug
            titel
            type
            updatedAt
            colorTheme
            topSektion {
              ... on Hero {
                id
                height
                billede {
                  caption
                  alt
                  height
                  url
                  width
                }
                overskrift
                tekst
              }
            }
            blokke {
              __typename
              ... on TaskForce {
                id
                title
                content {
                    html
                }
                information {
                    html
                }
                events {
                    titel
                    slug
                }
                personer {
                    jobtitel
                    linkedIn
                    mailadresse
                    navn
                    telefonnummer
                    billedePerson {
                        url
                        width
                        height
                        id
                        alt
                    }
                }
              }
              ... on BackgroundSection {
                id
                titel
                text
                backgroundColor
                link {
                    id
                    adresse
                    ikon
                    titel
                }
                backgroundImage {
                    id
                    url
                    height
                    width
                }
              }
              ... on CallToAction {
                id
                title
                label
                link
                icon
              }
              ... on Title {
                titleText
                maxWidth
              }
              ... on Testimonial {
                id
                colorTheme
                name
                jobTitle
                quote
                image {
                    id
                    height
                    width
                    url
                    alt
                    backgroundColor {
                        css
                    }
                }
              }
              ... on Section {
                id
                title
                sectionTheme: colorTheme
                sectionHeader {
                    id
                    heading
                    paragraph
                }
                richText {
                    html
                }
                downloadableAsset {
                    asset {
                        url   
                    }
                    preview {
                        url
                        width
                        height
                    }
                    assetTitel
                    description
                    id
                }
                sectionLink {
                    adresse
                    ikon
                    titel
                }
                rows {
                    id
                    rowTitle
                    rowText {
                        html
                    }
                    items {
                        ... on Column {
                            title
                            keepAspectRatio
                            columnText
                            columnImage {
                                url
                                height
                                width
                            }
                            columnButton {
                                adresse
                                ikon
                                label
                            }
                        }
                    }
                }
                blocks {
                    __typename
                    ... on Karussel {
                        id
                        overskriftKarussel
                        baggrundsfarve
                        items {
                          ... on Case {
                            __typename
                            billede {
                              height
                              id
                              url
                              width
                            }
                            dato
                            id
                            resume
                            slug
                            titel
                          }
                          ... on Event {
                            __typename
                            id
                            billede {
                                alt
                              height
                              id
                              url
                              width
                            }
                            dato
                            titel
                            resume
                            slug
                          }
                          ... on Publikation {
                            __typename
                            billede {
                              height
                              id
                              url
                              width
                            }
                            dato
                            id
                            resume
                            slug
                            titel
                          }
                        }
                        cta {
                          id
                          ikon
                          label
                          link
                        }
                    }
                }
              }
              ... on Grid {
                id
                gridHeading
                gridText
                gridLink {
                    adresse
                    ikon
                    titel
                }
                columns {
                  id
                  title
                  columnText
                  columnContent {
                    html
                  }
                  keepAspectRatio
                  columnImage {
                    id
                    height
                    width
                    url
                    alt
                    backgroundColor {
                      hex
                      css
                    }
                  }
                  columnButton {
                    id
                    label
                    ikon
                    adresse
                  }
                  caption
                }
                gridTheme: colorTheme
                stretchColumns
              }
              ... on Sektion {
                id
                billede {
                  alt
                  caption
                  id
                  url
                  width
                  height
                }
                maxBredde
                baggrundsfarve
                align
                titel
                tekst {
                  html
                }
                cta {
                  id
                  ikon
                  label
                  link
                  params
                }
              }
              ... on Partner {
                id
                baggrundsfarve
                callToAction {
                  id
                  ikon
                  label
                  link
                }
                overskrift
                tekstPartner {
                  html
                }
                partnere {
                  virksomhed
                  website
                  id
                  billede {
                    height
                    alt
                    url
                    width
                  }
                }
              }
              ... on Team {
                id
                overskriftTeam
                tekstTeam {
                  html
                }
                personer {
                  billedePerson {
                    height
                    width
                    url
                  }
                  id
                  jobtitel
                  mailadresse
                  navn
                  telefonnummer
                  linkedIn
                }
              }
              ... on USP {
                id
                baggrundsfarve
                overskriftUSP
                tekstUSP {
                  html
                }
                sellingPoint {
                  id
                  ikon
                  titel
                  tekst {
                    html
                  }
                }
                callToAction {
                  id
                  ikon
                  label
                  link
                }
              }
              ... on Karussel {
                id
                overskriftKarussel
                baggrundsfarve
                items {
                  ... on Case {
                    __typename
                    billede {
                      height
                      id
                      url
                      width
                    }
                    dato
                    id
                    resume
                    slug
                    titel
                  }
                  ... on Event {
                    __typename
                    id
                    billede {
                        alt
                      height
                      id
                      url
                      width
                    }
                    dato
                    titel
                    resume
                    slug
                  }
                  ... on Publikation {
                    __typename
                    billede {
                      height
                      id
                      url
                      width
                    }
                    dato
                    id
                    resume
                    slug
                    titel
                  }
                }
                cta {
                  id
                  ikon
                  label
                  link
                  params
                }
              }
              ... on Animeret {
                id
                baggrundsfarve
                overskriftAnimeret
                tekstAnimeret
                animeredeTal {
                  __typename
                  ... on Fraction {
                    id
                    beskrivelse
                    naevner
                    taeller
                  }
                  ... on Number {
                    id
                    betydning
                    enhed
                    tal
                  }
                }
              }
            }
          }
        }
    `, {
        variables: {
            stage: process.env.NODE_ENV === 'development' ? 'DRAFT' : 'PUBLISHED',
            slug,
        },
    })
    return side;
}

export async function getLandingPages() {
    const data = await fetchAPI(`
    query sider($stage: Stage!) {
      sider(stage: $stage, where: {
        parentPage: null,
        type_not: forside,
        AND: [
          {slug_not: "events"},
          {slug_not: "viden"},
          {slug_not: "cases"},
          {slug_not: "videnshub"}
        ]
      }) {
        id
        slug
      }
    }
  `, {
        variables: {
            stage: process.env.NODE_ENV === 'development' ? 'DRAFT' : 'PUBLISHED'
        },
    })
    return data.sider
}

export async function getChildSlugs() {
    const data = await fetchAPI(`
    query sider($stage: Stage!) {
      sider(stage: $stage, where: {parentPage: {}}) {
        id
        childSlug: slug
        parentPage {
            slug
        }
      }
    }
  `, {
        variables: {
            stage: process.env.NODE_ENV === 'development' ? 'DRAFT' : 'PUBLISHED'
        },
    })
    return data.sider
}

export async function getMenu(placering) {
    const data = await fetchAPI(`
    query menu($placering: Menutyper) {
      menu(where: {placering: $placering}) {
        punkter {
          ... on Menupunkt {
            id
            titel
            link {
              slug
              titel
              type
            }
            dropdownLinks {
              adresse
              params
              ikon
              id
              titel
              scrollToSection {
                ... on Grid {
                    id
                }
                ... on Section {
                    id
                }
                ... on Sektion {
                    id
                }
              }
            }
          }
        }
        knapper {
          adresse
          ikon
          id
          label
        }
      }
    }
    `, {
        variables: {
            placering
        }
    })
    return data.menu
}