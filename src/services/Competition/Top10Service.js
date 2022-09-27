import http from "@/services/Http";
import {ref} from "vue"; /* eslint-disable-line */

class Top10Service {
    get(params) {
        return http.get('top10/gotcoins/months', {params});
    }

    getLastTop10Ranking(params, theme) {
        return http.get(`top10/${theme}/ranking/last`, {params});
    }

    getTop10Ranking(reference, params, theme) {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const lastReference = `${year}-${month < 10 ? `0${month}` : month}`;

        if (lastReference === reference) {
            return http.get(`top10/${theme}/ranking/last`, {params});
        }

        return http.get(`top10/${theme}/ranking/${reference}`, {params});
    }

    disqualify({ id, reference, reason, theme }) {
        return http.post(`top10/${theme}/disqualify/${reference}/user/${id}`, {
            params: {
                reason
            }
        });
    }

    blacklist({ id, reason, theme }) {
        return http.post(`top10/${theme}/blacklist/user/${id}`, {
            params: {
                reason
            }
        });
    }
}

export default new Top10Service();
