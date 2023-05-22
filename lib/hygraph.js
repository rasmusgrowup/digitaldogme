async function fetchAPI(query, { variables, preview } = {}) {
    const res = await fetch(process.env.HYGRAPH_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${
                preview || process.env.development
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

export async function getAllCases(preview) {
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
  `,
        { preview }
    )
    return data.cases
}

export async function getCaseBySlug(slug, preview) {
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
            preview,
            variables: {
                stage: preview ? 'DRAFT' : 'PUBLISHED',
                slug,
            },
        }
    )
    return data
}

export async function getPageTopSection(slug, preview) {
    const { side } = await fetchAPI(`
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
        preview,
        variables: {
            stage: preview ? 'DRAFT' : 'PUBLISHED',
            slug,
        },
    })
    return side
}