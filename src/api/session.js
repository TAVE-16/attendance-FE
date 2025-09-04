import client from "./client";

export async function getSessions() {
    const response = await client.get('/v1/sessions');
    return response;
}

export async function postSession(requestBody) {
    const response = await client.post('/v1/sessions', requestBody);
    return response;
}

export async function deleteSession(id) {
    const response = await client.delete(`/v1/sessions/${id}`);
    return response;
}

export async function putSession(id, requestBody) {
    const response = await client.put(`/v1/sessions/${id}`, requestBody);
    return response;
}