export default function fetcher(url: string, options?: object, headers?: object) {
    return fetch(url, {
        ...options,
        headers: {
            ...headers,
            'Content-Type': 'application/json',
            "accept": "application/json"
        },
    });
}