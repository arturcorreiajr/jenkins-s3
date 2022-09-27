import http from "@/services/Http";

class AccountService {
    get(params) {
        return http.get(`moderators/accounts`, { params });
    }

    find(id) {
        return http.get(`moderators/accounts/${id}`);
    }

    delete(params) {
        return http.delete(`moderators/accounts/${params.id}`, {
            params: {
                reason: params.reason
            }
        });
    }

    restore(params) {
        return http.put(`moderators/accounts/${params.id}`, {
            reason: params.reason
        });
    }
}

export default new AccountService();
