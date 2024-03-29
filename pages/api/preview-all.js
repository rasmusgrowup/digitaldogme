export default async function handler(req, res) {
    // Check the secret and next parameters
    // This secret should only be known to this API route and the CMS
    if (
        req.query.secret !== process.env.SECRET
    ) {
        return res.status(401).json({ message: 'Invalid token' })
    }
    // Enable Preview Mode by setting the cookies
    res.setPreviewData({})

    // Redirect to the path from the fetched post
    // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
    res.redirect(307, '/')
    res.end()
}