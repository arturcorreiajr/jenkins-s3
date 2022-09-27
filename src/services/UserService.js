import http from "@/services/Http";

class UserService {
    get(id = null) {
        if (id) {
            return http.get(`users/${id}`)
        }

        return http.get('users');
    }

    create(user) {
        return http.post('users/', user);
    }

    update(user) {
        return http.put(`users/${user.id}`, {
            roles: user.roles,
            password: user.password
        });
    }

    delete(user) {
        return http.delete(`users/${user.id}`);
    }
}

export default new UserService();
