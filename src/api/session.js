import client from "./client";

export async function getSessions() {
    const token = localStorage.getItem('accessToken');
    console.log('세션 조회 - 사용 중인 토큰:', token ? '토큰 있음' : '토큰 없음');
    
    const response = await client.get('/v1/sessions');
    return response.data;
}

export async function postSession(requestBody) {
    const response = await client.post('/v1/sessions', requestBody);
    return response.data;
}

export async function deleteSession(session) {
    const response = await client.delete(`/v1/sessions/${session}`);
    return response.data;
}