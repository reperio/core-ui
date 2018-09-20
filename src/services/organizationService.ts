import { axios } from "./axiosService";

class OrganizationService {
    async getOrganizationById(orgId: string) {
        return await axios.get(`/organizations/${orgId}`);
    }

    async getOrganizations() {
        return await axios.get(`/organizations`);
    }
}

export const organizationService = new OrganizationService();