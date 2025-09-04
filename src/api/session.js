import client from "./client";

export async function getSessions() {
    const response = await client.get('/v1/sessions');
    return response;
}

export async function postSession(requestBody) {
    const response = await client.post('/v1/sessions', requestBody);
    return response;
}

export async function deleteSession(session) {
    const response = await client.delete(`/v1/sessions/${session}`);
    return response;
}