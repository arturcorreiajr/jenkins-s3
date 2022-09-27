import http from "@/services/Http";

class SweepstakeService {
    get(params) {
        return http.get('wallet/draw/winners', {
            params
        });
    }

    unvalidated() {
        return http.get('wallet/draw/winners/unvalidated');
    }

    disqualify(id, params) {
        return http.post(`wallet/draw/${id}/invalidated-winner`, params);
    }

    validate(id) {
        return http.post(`wallet/draw/${id}/validate-winner`);
    }
}

export default new SweepstakeService();
