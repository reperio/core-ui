import { axios } from "./axiosService";
import UserEmail from "../models/userEmail";

class UserService {
    async getUserById(userId: string) {
        return await axios.get(`/users/${userId}`);
    }

    async getUsers() {
        return await axios.get(`/users`);
    }

    async createUser(primaryEmailAddress: string, firstName: string, lastName: string, password: string, confirmPassword: string, organizationIds: string[]) {
        const payload = {
            primaryEmailAddress, 
            firstName, 
            lastName, 
            password, 
            confirmPassword, 
            organizationIds
        }
        return await axios.post(`/users`, payload);
    }

    async editUser(userId: string, firstName: string, lastName: string, organizationIds: string[], roleIds: string[], userEmails: UserEmail[], primaryEmailId: string) {
        const payload = {
            firstName, 
            lastName, 
            organizationIds, 
            roleIds, 
            userEmails: userEmails.map((userEmail: UserEmail) => { 
                return { 
                    email: userEmail.email, 
                    id: userEmail.id 
                }
            }), 
            primaryEmailId
        }
        return await axios.put(`/users/${userId}`, payload);
    }
}

export const userService = new UserService();