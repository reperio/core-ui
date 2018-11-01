import Role from "./role";
import Permission from "./permission";

export default class RolePermission {
    roleId: string;
    permissionName: string;
    role: Role;
    permission: Permission;
}