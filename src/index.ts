import express, { Application, NextFunction, Request, Response } from 'express'
import helmet from 'helmet'
import userRoutes from './route/UserRoutes'
import bodyParser from 'body-parser'
import logger from './utils/Logger'
import MongoConnection from './config/Mongo'

const PORT = 8000
const app: Application = express()
const mongoConnection = new MongoConnection()

// Middleware

mongoConnection.connect()
app.use(helmet())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    logger.info(`*-*- NODE *-* ::: ${req.url} :::: REQUEST :: ${JSON.stringify(req.body)}`);
    res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
    })
    next();
});

// Routes
app.use('/api/v1/user', userRoutes)

app.listen(PORT, () => {
    logger.info(`Server is running on  https://localhost:${PORT}`)
})


export default app