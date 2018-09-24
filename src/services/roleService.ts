import { axios } from "./axiosService";

class RoleService {
    async getRoleById(roleId: string) {
        return await axios.get(`/roles/${roleId}`);
    }

    async getRoles() {
        return await axios.get(`/roles`);
    }

    async createRole(role: any) {
        return await axios.post(`/roles`, role);
    }

    async editRole(roleId: string, role: any) {
        return await axios.put(`/roles/${roleId}`, role);
    }

    async deleteRole(roleId: string) {
        return await axios.delete(`/roles/${roleId}`);
    }
}

export const roleService = new RoleService();