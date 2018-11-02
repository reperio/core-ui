import { axios } from "./axiosService";
import UserEmail from "../models/userEmail";
import User from "../models/user";

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

    async editUserGeneral(userId: string, firstName: string, lastName: string) {
        const payload = {
            firstName, 
            lastName
        }
        return await axios.put(`/users/${userId}/general`, payload);
    }

    async editUserEmails(userId: string, initialUser: User, added: UserEmail[], deleted: UserEmail[], primaryUserEmail: UserEmail) {

        if(added.length > 0) {
            const payload = {
                userEmails: added
                    .map((x: UserEmail) => {
                        return {
                            email: x.email,
                            id: x.id
                        }
                    })
                }

            await axios.post(`/users/${userId}/addUserEmails`, payload);
        }

        if(deleted.length > 0) {
            const payload = {
                userEmailIds: deleted.map((x: UserEmail) => x.id)
            };
    
            await axios.post(`/users/${userId}/deleteUserEmails`, payload);
        }

        if (initialUser.primaryEmailAddress !== primaryUserEmail.email) {
            const payload = {
                primaryUserEmailId: primaryUserEmail.id
            };

            await axios.put(`/users/${userId}/setPrimaryUserEmail`, payload);
        }
    }

    async editUserOrganizations(userId: string, organizationIds: string[]) {
        const payload = {
            organizationIds
        }
        return await axios.put(`/users/${userId}/organizations`, payload);
    }

    async editUserRoles(userId: string, roleIds: string[]) {
        const payload = {
            roleIds
        }
        return await axios.put(`/users/${userId}/roles`, payload);
    }
}

export const userService = new UserService();