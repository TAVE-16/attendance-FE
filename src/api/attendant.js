import client from './client';

export async function postAttendant(requestBody) {
    const response = await client.post(`/v1/sessions/mark`, requestBody);
    return response;
}