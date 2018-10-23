import RolePermission from "./rolePermission";

export default class Permission {
    id: string;
    name: string;
    rolePermissions: RolePermission[];
    displayName: string;
    description: string;
    isSystemAdminPermission: boolean;
    lastModified: Date;
}