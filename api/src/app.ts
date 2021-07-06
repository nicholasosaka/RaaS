import express from 'express';
import morgan from 'morgan';
import { logger } from "./logger";
import { Resume, parse } from './parser'
import axios from 'axios'

// API
const app = express();
const port = 8080;

const morganTokens = ':remote-addr :method :url :status :res[content-length] bytes in :response-time ms';
app.use(morgan(morganTokens, { stream: { write: message => logger.info(message.trim()) } }))

app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).json({ "status": "Resume as a Service" });
})

app.post("/resume", (req, res) => {
    const resumeInfo: Resume = req.body.resume
    const texData: string = parse(resumeInfo)

    axios.post('http://latex:8081/tex', {
        texContents: texData
    })
        .then((response) => {
            res.status(200).json({
                "status": "Not yet implemented",
                "texData": texData,
                "data": resumeInfo
            })
        })
        .catch((error) => {
            logger.debug(`Error when sending request to raas_latex: ${error}`);
        });


})

app.listen(port, () => {
    logger.info(`API listening on port ${port}`);
})