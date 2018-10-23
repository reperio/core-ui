import User from "./user";
import Organization from "./organization";

export default class UserOrganization {
    userId: string;
    organizationId: string;
    user: User;
    organization: Organization;
}