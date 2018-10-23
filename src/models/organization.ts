import UserOrganization from "./userOrganization";
import Dropdown from "./dropdown";

export default class Organization {
    id: string;
    name: string;
    selectedUsers: Dropdown[];
    userOrganizations: UserOrganization[];
    personal: boolean;
}