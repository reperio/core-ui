import { axios } from "./axiosService";

class UserService {
    async getUserById(userId: string) {
        return await axios.get(`/users/${userId}`);
    }

    async getUsers() {
        return await axios.get(`/users`);
    }

    async createUser(primaryEmail: string, firstName: string, lastName: string, password: string, confirmPassword: string, organizationIds: string[]) {
        return await axios.post(`/users`, {primaryEmail, firstName, lastName, password, confirmPassword, organizationIds});
    }
}

export const userService = new UserService();