import { axios } from "./axiosService";

class PermissionService {
    async getPermissionById(permissionId: string) {
        return await axios.get(`/permissions/${permissionId}`);
    }

    async getPermissions() {
        return await axios.get(`/permissions`);
    }

    async createPermission(permission: any) {
        return await axios.post(`/permissions`, permission);
    }
}

export const permissionService = new PermissionService();