import express from "express";
import { PORT, mongoDBURL } from "./config.js"
import mongoose from "mongoose";
import { Log } from "./models/logModels.js"

const app = express();

app.use(express.json())

app.get('/', (request, response) => {
    return response.status(234).send('Working')
});

app.post('/logs', async (request, response) => {
    try {
        const newLog = {
            log_id: request.body.log_id
        };

        const log = await Log.create(newLog);

        return response.status(201).send(log);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
});

app.get('/logs', async (request, response) => {
    try {
        const logList = await Log.find({});

        return response.status(200).json({
            length: logList.length,
            data: logList
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
});

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });