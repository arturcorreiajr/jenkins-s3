import http from "@/services/Http";

class PromoterService {
    get(id = null) {
        if (id) {
            return http.get(`promoters/campaigns/${id}`);
        }

        return http.get('promoters/campaigns');
    }

    create(params) {
        return http.post('promoters/campaigns/create', params);
    }

    remove(id) {
        return http.delete(`promoters/campaigns/delete/${id}`);
    }

    history(id) {
        return http.get(`promoters/campaigns/history/${id}`);
    }

    import(formData) {
        const headers = {
            'Content-Type': 'multipart/form-data'
        };

        return http.post(`promoters/import`, formData, {headers});
    }

    report(params) {
        return http.get(`promoters/report`, {
            params
        });
    }

    agencies(id) {
        return http.get(`promoters/campaigns/${id}/agencies`);
    }

    addInfluencer(params) {
        return http.post('promoters/add', params);
    }

    removeInfluencers(params) {
        return http.post('promoters/remove', params);
    }


}

export default new PromoterService();
