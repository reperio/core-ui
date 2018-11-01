import { axios } from "./axiosService";
import RolePermission from "../models/rolePermission";

class PermissionService {
    async getPermissionById(permissionName: string) {
        return await axios.get(`/permissions/${permissionName}`);
    }

    async getPermissions() {
        return await axios.get(`/permissions`);
    }

    async editPermission(permissionName: string, displayName: string, description: string, isSystemAdminPermission: boolean, rolePermissions: RolePermission[]) {
        const payload = {
            displayName,
            description,
            isSystemAdminPermission,
            rolePermissions: rolePermissions.map((rolePermission: RolePermission) => {
                return {
                    roleId: rolePermission.roleId,
                    permissionName: rolePermission.permissionName
                }
            })
        }
        return await axios.put(`/permissions/${permissionName}`, payload);
    }
}

export const permissionService = new PermissionService();