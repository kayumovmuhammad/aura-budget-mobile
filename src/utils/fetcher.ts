import { CapacitorHttp } from '@capacitor/core';

export default async function fetcher(url: string, options?: any, headers?: any) {
    let data = options?.body;
    
    // CapacitorHttp prefers objects for application/json requests
    if (typeof data === 'string') {
        try {
            data = JSON.parse(data);
        } catch (e) {
            // Keep as string if parsing fails
        }
    }

    const response = await CapacitorHttp.request({
        url,
        method: options?.method || 'GET',
        headers: {
            ...headers,
            ...(options?.headers || {}),
            'Content-Type': 'application/json',
            'accept': 'application/json'
        },
        data
    });

    return {
        ok: response.status >= 200 && response.status < 300,
        status: response.status,
        json: async () => typeof response.data === 'string' ? JSON.parse(response.data) : response.data,
        text: async () => typeof response.data === 'string' ? response.data : JSON.stringify(response.data),
    };
}