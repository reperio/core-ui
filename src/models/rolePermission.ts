import Role from "./role";
import Permission from "./permission";

export default class RolePermission {
    roleId: string;
    permissionId: string;
    role: Role;
    permission: Permission;
}