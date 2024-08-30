import axios, { AxiosError, AxiosResponse } from "axios";

const url: string = 'http://localhost:3002/timeoff';

export class TimeoffService {
    constructor() { }

    public async healthcheck () : Promise<AxiosResponse | any> {
        try {
            const resposne: AxiosResponse = await axios.get(`${url}/healthcheck`);
            return resposne;   
        } catch (error) {
            const axiosError = error as AxiosError;
            console.log(`Error in timeoff service:: healthcheck: ${JSON.stringify(axiosError.message)} and ${JSON.stringify(axiosError.response?.data)}`);
            return {
                "data": {
                    "name": "timeoff",
                    "status": axiosError.status || axiosError.code,
                    "message": axiosError.message
                }
            };
        }
    }
}