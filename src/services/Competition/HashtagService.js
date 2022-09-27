import http from "@/services/Http";

class HashtagService {
    get(params) {
        return http.get('hashtags', {
            params
        });
    }

    create(formData) {
        const headers = {
            'Content-Type': 'multipart/form-data'
        };

        return http.post('hashtags', formData, { headers });
    }

    edit(id, formData) {
        const headers = {
            'Content-Type': 'multipart/form-data'
        };

        return http.post(`hashtags/${id}`, formData, { headers });
    }
}

export default new HashtagService();
