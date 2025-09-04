import client from "./client";

export async function getSessions() {
    const response = await client.get('/v1/sessions');
    return response.data;
}
