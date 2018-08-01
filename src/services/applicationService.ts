import { axios } from "./axiosService";

class ApplicationService {
    async getAllApplications() {
        return await axios.get(`/applications`);
    }
}

export const applicationService = new ApplicationService();