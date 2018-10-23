import { axios } from "./axiosService";
import Dropdown from "../models/dropdown";

class OrganizationService {
    async getOrganizationById(organizationId: string) {
        return await axios.get(`/organizations/${organizationId}`);
    }

    async getOrganizations() {
        return await axios.get(`/organizations`);
    }

    async createOrganization(name: string, userIds: Dropdown[]) {
        const payload = {
            name, 
            personal: false, 
            userIds: userIds ? userIds.map((x: Dropdown) => x.value) : []
        }
        return await axios.post(`/organizations`, payload);
    }

    async editOrganization(organizationId: string, name: string, userIds: string[]) {
        const payload = {
            name, 
            userIds
        }
        return await axios.put(`/organizations/${organizationId}`, payload);
    }

    async deleteOrganization(organizationId: string) {
        return await axios.delete(`/organizations/${organizationId}`);
    }
}

export const organizationService = new OrganizationService();