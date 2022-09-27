import http from "@/services/Http";

class ContestService {
    get(params) {
        return http.get('contest/hashtags/', {
            params
        });
    }

    find(id, params) {
        return http.get(`contest/hashtags/${id}`, { params });
    }

    create(params) {
        return http.post('contest/hashtags', params);
    }

    update(id, params) {
        return http.put(`contest/hashtags/${id}`, params);
    }

    disqualify({ contest, post, reason }) {
        return http.post(`contest/hashtags/${contest}/post/${post}/remove`, {
            reason
        });
    }

    restore({ contest, post, reason }) {
        return http.post(`contest/hashtags/${contest}/post/${post}/restore`, {
            reason
        });
    }

    validateWinners(contest) {
        return http.post(`contest/hashtags/${contest}/validate-winners`);
    }
}

export default new ContestService();
