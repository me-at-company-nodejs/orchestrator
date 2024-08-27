import express, { Application } from 'express';
import orchestratorRoute from './routes/orchestrator.route';

const app: Application = express();
const port: number = 3000;

// Link orchestratorRoute with app
app.use('/', orchestratorRoute);

app.listen(port, () => {
    console.log(`Connected successfully on port ${port}`);
});
