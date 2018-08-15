import { axios } from "./axiosService";

class UserService {
    async getUserById(userId: number) {
        return await axios.get(`/users/${userId}`);
    }

    async getUsers() {
        return await axios.get(`/users`);
    }
}

export const userService = new UserService();