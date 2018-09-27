import { axios } from "./axiosService";

class AuthService {
    async login(primaryEmailAddress: string, password: string) {
        return await axios.post(`/auth/login`, {primaryEmailAddress, password});
    }

    parseJwt(token: string): any {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');

        return JSON.parse(window.atob(base64));
    }

    async signup(primaryEmailAddress: string, firstName: string, lastName: string, password: string, confirmPassword: string) {
        return await axios.post(`/auth/signup`, {primaryEmailAddress, firstName, lastName, password, confirmPassword});
    }

    async recaptcha(response: string) {
        return await axios.post(`/auth/recaptcha`, {response});
    }

    async emailVerification(token: string) {
        return await axios.post(`/auth/emailVerification`, {token});
    }
}

export const authService = new AuthService();