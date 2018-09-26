import { axios } from "./axiosService";

class OrganizationService {
    async getOrganizationById(orgId: string) {
        return await axios.get(`/organizations/${orgId}`);
    }

    async getOrganizations() {
        return await axios.get(`/organizations`);
    }

    async createOrganization(organization: any) {
        return await axios.post(`/organizations`, organization);
    }

    async editOrganization(orgId: string, role: any) {
        return await axios.put(`/organizations/${orgId}`, role);
    }

    async deleteOrganization(orgId: string) {
        return await axios.delete(`/organizations/${orgId}`);
    }
}

export const organizationService = new OrganizationService();