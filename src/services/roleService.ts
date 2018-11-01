import { axios } from "./axiosService";
import Dropdown from "../models/dropdown";

class RoleService {
    async getRoleById(roleId: string) {
        return await axios.get(`/roles/${roleId}`);
    }

    async getRoles() {
        return await axios.get(`/roles`);
    }

    async createRole(name: string, application: Dropdown, organization: Dropdown, permissions: Dropdown[]) {
        const payload = {
            name, 
            applicationId: application ? application.value : null, 
            organizationId: organization.value, 
            permissions: permissions ? permissions.map((x: Dropdown) => x.value) : []
        }
        return await axios.post(`/roles`, payload);
    }

    async editRole(roleId: string, name: string, permissions: string[]) {
        const payload = {
            name, 
            permissions
        }
        return await axios.put(`/roles/${roleId}`, payload);
    }

    async deleteRole(roleId: string) {
        return await axios.delete(`/roles/${roleId}`);
    }
}

export const roleService = new RoleService();