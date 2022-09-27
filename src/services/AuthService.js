import { http } from '../plugins/axios'

class AuthService {
    async login(username, password) {
        return http.post('login', {
            username,
            password
        });
    }

    makeSession(user) {
        if (user === undefined) {
            return false;
        }

        localStorage.setItem('user', JSON.stringify(user));

        setTimeout(() => {
            window.location.reload()
        }, 3000);
    }

    getToken() {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            return user.token;
        }

        return null;
    }

    logout() {
        localStorage.removeItem('user');
    }
}

export default new AuthService();
