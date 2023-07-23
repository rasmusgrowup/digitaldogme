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
              ... on CallToAction {
                id
                title
                label
                link
                icon
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
                colorTheme
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
                columns {
                  id
                  title
                  columnText
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
                }
                colorTheme
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
        type_not: forside,
        AND: [
          {slug_not: "events"}
          {slug_not: "viden"}
          {slug_not: "cases"}
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