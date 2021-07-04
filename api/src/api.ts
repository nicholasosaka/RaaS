import express from 'express';
import morgan from 'morgan';
import { logger } from "./logger";

// API
const api = express();
const port = 8080;

const morganTokens = ':remote-addr :method :url :status :res[content-length] bytes in :response-time ms';
api.use(morgan(morganTokens, { stream: { write: message => logger.info(message.trim()) } }))

api.get("/", (req, res) => {
    res.status(200).json({ "msg": "RaaS" });
})

api.listen(port, () => {
    logger.info(`API listening on port ${port}`);
})