import { axios } from "./axiosService";

class ApplicationService {
    async getApplicationById(applicationId: string) {
        return await axios.get(`/applications/${applicationId}`);
    }

    async getApplications() {
        return await axios.get(`/applications`);
    }
}

export const applicationService = new ApplicationService();