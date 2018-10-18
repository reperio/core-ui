import Organization from "./organization";
import Dropdown from "./dropdown";
import SelectedRole from "./selectedRole";
import UserOrganization from "./userOrganization";
import UserRole from "./userRole";

export default class User {
    id: string;
    firstName: string;
    lastName: string;
    password: string;
    selectedOrganizations: Dropdown[];
    userOrganizations: UserOrganization[];
    userRoles: UserRole[];
    primaryEmailAddress: string;
    selectedRoles: SelectedRole[];
}