export const fetchMedia = async (
    query: string,
    mediaType: string = 'all',
    limit: number = 10,
    offset: number = 0
) => {
    const endpoint = `https://itunes.apple.com/search?term=${encodeURIComponent(
        query
    )}&media=${mediaType}&limit=${limit}&offset=${offset}`;
    const response = await fetch(endpoint);

    if (!response.ok) {
        throw new Error(`Failed to fetch results: ${
            response.statusText
                ? response.statusText
                : 'Something went wrong'
        }`);
    }

    return response.json();
};

