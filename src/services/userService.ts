import { axios } from "./axiosService";

class UserService {
    async getUserById(userId: number) {
        return await axios.get(`/users/${userId}`);
    }
}

export const userService = new UserService();