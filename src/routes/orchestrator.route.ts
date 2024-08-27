import express, { Router, Request, Response } from "express";
import { EmployeeService } from "../services/employee.service";
import { TimeoffService } from "../services/timeoff.service";
import { AdminService } from "../services/admin.service";
import { AxiosResponse } from "axios";
import status from 'http-status';
import httpStatus from "http-status";

const router: Router = express.Router();
const employee = new EmployeeService();
const timeoff = new TimeoffService();
const admin = new AdminService();

router.get('/healthcheck', async (req: Request, res: Response) => {
    try {
        let services: Array<any> = [];
        let response = {
            "applicationStatus": status.OK,
            "host": "localhost",
            "services": services
        }

        const employeeResposne: AxiosResponse = await employee.healthcheck();
        response.services.push(employeeResposne.data);

        const timeoffResposne: AxiosResponse = await timeoff.healthcheck();
        response.services.push(timeoffResposne.data);

        const adminResposne: AxiosResponse = await admin.healthcheck();
        response.services.push(adminResposne.data);

        // Checking status for all services
        for (let index = 0; index < response.services.length; index++) {
            const service = response.services[index];
            if (service.status !== httpStatus.OK) {
                response.applicationStatus = service.status;
                break;
            }
        }

        res.status(status.OK).json(response);
    } catch (error: any) {
        console.log('Error in orchestrator route:: healthcheck: ', error)
        res.status(status.INTERNAL_SERVER_ERROR).send('Error in orchestrator route:: healthcheck');
    }
});

export default router;
