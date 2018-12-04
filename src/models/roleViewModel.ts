import { Role, Permission } from "@reperio/core-connector";

interface RoleViewModel {
    role: Role;
    selectedPermissions: Permission[];
}

export { RoleViewModel }