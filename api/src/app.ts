import express from 'express';
import morgan from 'morgan';
import { logger } from "./logger";

// API
const app = express();
const port = 8080;

const morganTokens = ':remote-addr :method :url :status :res[content-length] bytes in :response-time ms';
app.use(morgan(morganTokens, { stream: { write: message => logger.info(message.trim()) } }))

app.get("/", (req, res) => {
    res.status(200).json({ "msg": "RaaS" });
})

app.listen(port, () => {
    logger.info(`API listening on port ${port}`);
})