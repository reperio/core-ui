import { axios } from "./axiosService";

class AuthService {
    async login(email: string, password: string) {
        return await axios.post(`/auth/login`, {email, password});
    }

    parseJwt(token: string): any {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');

        return JSON.parse(window.atob(base64));
    }

    async signup(email: string, firstName: string, lastName: string, password: string, confirmPassword: string) {
        return await axios.post(`/auth/signup`, {email, firstName, lastName, password, confirmPassword});
    }
}

export const authService = new AuthService();