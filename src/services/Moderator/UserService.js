import http from "@/services/Http";

class UserService {
    find(username) {
        return http.get(`moderators/users/${username}`);
    }

    suspend(params) {
        return http.post('moderators/users/suspend', params);
    }

    ban(params) {
        return http.post('moderators/users/ban', params);
    }

    del(params) {
        return http.delete(`moderators/users/${params.username}`, {
            params: {
                reason: params.reason
            }
        });
    }

    verify(formData) {
        const headers = {
            'Content-Type': 'multipart/form-data'
        };

        return http.post(`moderators/users/verify`, formData, { headers });
    }
}

export default new UserService();
