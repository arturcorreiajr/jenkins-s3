import http from "@/services/Http";

class PostService {
    get(params) {
        return http.get(`moderators/posts`, { params });
    }

    find(id) {
        return http.get(`moderators/posts/${id}`);
    }

    delete(params) {
        return http.delete(`moderators/posts/${params.id}`, {
            params: {
                reason: params.reason
            }
        });
    }

    restore(params) {
        return http.put(`moderators/posts/${params.id}`, {
            reason: params.reason
        });
    }
}

export default new PostService();
