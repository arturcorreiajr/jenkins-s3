import http from "@/services/Http";

class RoleService {
    get() {
        return http.get('roles');
    }
}

export default new RoleService();
