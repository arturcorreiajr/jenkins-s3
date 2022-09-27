import http from "@/services/Http";

class AmbassadorService {
    get(id = null) {
        if (id) {
            return http.get(`ambassadors/campaigns/${id}`);
        }

        return http.get('ambassadors/campaigns');
    }

    create(params) {
        return http.post('ambassadors/campaigns/create', params);
    }

    remove(id) {
        return http.delete(`ambassadors/campaigns/delete/${id}`);
    }

    import(formData) {
        const headers = {
            'Content-Type': 'multipart/form-data'
        };

        return http.post(`ambassadors/import`, formData, {headers});
    }

    history(id) {
        return http.get(`ambassadors/campaigns/history/${id}`);
    }

    report(params) {
        return http.get(`ambassadors/report`, {
            params
        });
    }

    agencies(id) {
        return http.get(`ambassadors/campaigns/${id}/agencies`);
    }

    removeInfluencers(params) {
        return http.post('ambassadors/remove', params);
    }

    addInfluencer(params) {
        return http.post('ambassadors/add', params);
    }

    importBonus(formData) {
        const headers = {
            'Content-Type': 'multipart/form-data'
        };

        return http.post(`ambassadors/bonus/import`, formData, {headers});
    }

    bonusHistory(id) {
        return http.get(`ambassadors/bonus/list/${id}`);
    }

    downloadBonusFile(id) {
        return http.get(`ambassadors/bonus/download/${id}`);
    }

    bonusReport(params) {
        return http.get(`ambassadors/bonus/report`, {
            params
        });
    }
}

export default new AmbassadorService();
