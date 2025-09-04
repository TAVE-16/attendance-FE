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

export async function getSessionMembers(sessionId, statusFilter = null, fieldFilter = null) {
    let url = `/v1/sessions/${sessionId}/members`;
    const params = new URLSearchParams();
    
    if (statusFilter) {
        params.append('status', statusFilter);
    }
    if (fieldFilter) {
        // 프론트엔드는 배열이므로 둘 다 추가
        if (Array.isArray(fieldFilter)) {
            fieldFilter.forEach(field => {
                params.append('field', field);
            });
        } else {
            params.append('field', fieldFilter);
        }
    }
    
    if (params.toString()) {
        url += `?${params.toString()}`;
    }
    
    const response = await client.get(url);
    return response;
}