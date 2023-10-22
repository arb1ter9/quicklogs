import express from "express";
import { PORT, mongoDBURL } from "./config.js"
import mongoose, { get, mongo } from "mongoose";
import { Log } from "./models/logModels.js"
import cors from 'cors'
import axios from 'axios'

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', async (request, response) => {
    return response.status(234).send('Working')
});

app.post('/logs/:id', async (request, response) => {
    try {
        const { id } = request.params
        const getLog = await Log.find({log_id: id})

        axios
            .get(`https://logs.tf/api/v1/log/${id}`)
            .then(async (fetchres) => {
                if (getLog[0]) {
                    return response.status(403).send({
                        message: 'Log already exists. Cannot create.'
                    })
                } else {
                    const newLog = {
                        log_id: id,
                        title: fetchres.data.info.title,
                        match_length: fetchres.data.info.total_length,
                        players: Object.keys(fetchres.data.names).length
                    }

                    const createdLog = await Log.create(newLog)

                    return response.status(200).send(createdLog)
                }
            })
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