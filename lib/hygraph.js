async function fetchAPI(query, { variables, preview } = {}) {
    const res = await fetch(process.env.HYGRAPH_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${
                preview
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
      query cases($slug: String!) {
      case(where: {slug: $slug}) {
        id
        slug
        titel
        resume
        resumeTest
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
    return data.posts
}

export async function getCases(slug, preview) {
    const data = await fetchAPI(
        `
    query cases($slug: String!, $stage: Stage!) {
      case(stage: $stage, where: {slug: $slug}) {
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
        {
            preview,
            variables: {
                stage: 'DRAFT',
                slug,
            },
        }
    )
    return data
}