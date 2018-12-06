import { Role, User, Organization, UserEmail } from "@reperio/core-connector";

interface UserViewModel {
    user: User;
    selectedOrganizations: Organization[],
    selectedRoles: Role[]
    selectedUserEmails: UserEmail[];
}

export { UserViewModel }