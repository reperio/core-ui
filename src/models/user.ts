import Dropdown from "./dropdown";
import SelectedRole from "./selectedRole";
import UserOrganization from "./userOrganization";
import UserRole from "./userRole";
import UserEmail from "./userEmail";

export default class User {
    id: string;
    firstName: string;
    lastName: string;
    password: string;
    selectedOrganizations: Dropdown[];
    userOrganizations: UserOrganization[];
    userRoles: UserRole[];
    userEmails: UserEmail[];
    primaryEmailAddress: string;
    selectedRoles: SelectedRole[];
}