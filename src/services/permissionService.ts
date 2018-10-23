import { axios } from "./axiosService";
import RolePermission from "../models/rolePermission";

class PermissionService {
    async getPermissionById(permissionId: string) {
        return await axios.get(`/permissions/${permissionId}`);
    }

    async getPermissions() {
        return await axios.get(`/permissions`);
    }

    async editPermission(permissionId: string, displayName: string, name: string, description: string, isSystemAdminPermission: boolean, rolePermissions: RolePermission[]) {
        const payload = {
            displayName,
            name,
            description,
            isSystemAdminPermission,
            rolePermissions: rolePermissions.map((rolePermission: RolePermission) => {
                return {
                    roleId: rolePermission.roleId,
                    permissionId: rolePermission.permissionId
                }
            })
        }
        return await axios.put(`/permissions/${permissionId}`, payload);
    }
}

export const permissionService = new PermissionService();