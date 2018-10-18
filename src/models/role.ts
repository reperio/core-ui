import Organization from "./organization";
import RolePermission from "./rolePermission";
import Dropdown from "./dropdown";

export default class Role {
    id: string;
    name: string;
    organization: Organization;
    organizationId: string;
    selectedPermissions: Dropdown[];
    visible: boolean;
    rolePermissions: RolePermission[];
}