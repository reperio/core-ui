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
        const payload = {
            primaryEmailAddress,
            firstName, 
            lastName, 
            password, 
            confirmPassword
        }
        return await axios.post(`/auth/signup`, payload);
    }

    async recaptcha(response: string) {
        return await axios.post(`/auth/recaptcha`, {response});
    }

    async emailVerification(token: string) {
        const payload = {
            token
        }
        return await axios.post(`/auth/emailVerification`, payload);
    }

    async forgotPassword(primaryEmailAddress: string) {
        const payload = {
            primaryEmailAddress
        }
        return await axios.post(`/auth/forgotPassword`, payload);
    }

    async resetPassword(token: string, password: string, confirmPassword: string) {
        const payload = {
            token, 
            password, 
            confirmPassword
        }
        return await axios.post(`/auth/resetPassword`, payload);
    }

    async verifyResetPassword(token: string) {
        return await axios.get(`/auth/resetPassword/${token}`);
    }

    async sendVerificationEmail(userId: string, email: string) {
        const payload = {
            userId, 
            email
        }
        return await axios.post(`/auth/sendVerificationEmail`, payload);
    }
}

export const authService = new AuthService();