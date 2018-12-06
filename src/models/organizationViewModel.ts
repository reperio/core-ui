import { Organization, User } from "@reperio/core-connector";

interface OrganizationViewModel {
    organization: Organization;
    selectedUsers: User[];
}

export { OrganizationViewModel }