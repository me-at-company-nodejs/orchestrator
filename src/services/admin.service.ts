import axios, { AxiosError, AxiosResponse } from "axios";

const url: string = "http://localhost:3003/admin";

export class AdminService {
    constructor() { }

    public async healthcheck(): Promise<AxiosResponse | any> {
        try {
            const response: AxiosResponse = await axios.get(`${url}/healthcheck`);
            return response;
        } catch (error) {
            const axiosError = error as AxiosError;
            console.log("Error in admin service:: healthcheck: ", axiosError.message);
            return {
                "data": {
                    "name": "admin",
                    "status": axiosError.status || axiosError.code,
                    "message": axiosError.message
                }
            };
        }
    }
}