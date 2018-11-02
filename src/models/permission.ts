import RolePermission from "./rolePermission";

export default class Permission {
    name: string;
    rolePermissions: RolePermission[];
    displayName: string;
    description: string;
    isSystemAdminPermission: boolean;
    lastModified: Date;
}