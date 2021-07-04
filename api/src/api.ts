import dotenv from "dotenv";
import express from 'express';
import morgan from 'morgan';
import { logger } from "./logger";

dotenv.config(); // load .env file

// API
const api = express();
const port = process.env.API_PORT;

const morganTokens = ':remote-addr :method :url :status :res[content-length] bytes in :response-time ms';
api.use(morgan(morganTokens, { stream: { write: message => logger.info(message.trim()) } }))

api.get("/", (req, res) => {
    res.status(200).json({ "msg": "RaaS" });
})

api.listen(port, () => {
    logger.info(`API listening on port ${port}`);
})