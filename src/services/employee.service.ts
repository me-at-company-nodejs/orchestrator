import axios, { AxiosError, AxiosResponse } from "axios";

const url: string = "http://localhost:3001/employee";

export class EmployeeService {
    constructor() { }

    public async healthcheck () : Promise<AxiosResponse | any> {
        try {
            const resposne: AxiosResponse = await axios.get(`${url}/healthcheck`);
            return resposne;   
        } catch (error) {
            const axiosError = error as AxiosError;
            console.log(`Error in employee service:: healthcheck: ${JSON.stringify(axiosError.message)} and ${JSON.stringify(axiosError.response?.data)}`);
            return {
                "data": {
                    "name": "employee",
                    "status": axiosError.status || axiosError.code,
                    "message": axiosError.message
                }
            };
        }
    }
}