import http from "@/services/Http";

class CommentService {
    get(params) {
        return http.get(`moderators/comments`, { params });
    }

    find(id) {
        return http.get(`moderators/comments/${id}`);
    }

    delete(params) {
        return http.delete(`moderators/comments/${params.id}`, {
            params: {
                reason: params.reason
            }
        });
    }

    restore(params) {
        return http.put(`moderators/comments/${params.id}`, {
            reason: params.reason
        });
    }
}

export default new CommentService();
