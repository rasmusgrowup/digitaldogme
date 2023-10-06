import { ImageResponse } from '@vercel/og';

export const config = {
    runtime: 'experimental-edge',
};

export default async function handler(req) {
    const {searchParams} = new URL(req.url)
    const title = searchParams.get('title') ?? 'Digital Dogme';
    const imageUrl = searchParams.get('url') ?? '';

    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 100,
                    fontWeight: '700',
                    color: 'white',
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: '100% 140%',
                    backgroundPosition: 'center',
                    width: '1200px',
                    height: '630px',
                    padding: '50px',
                    textAlign: 'left',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                }}
            >
                Digital Dogme | {title}
            </div>
        ),
        {
            width: 1200,
            height: 630,
        },
    );
}