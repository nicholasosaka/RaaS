import express from 'express';
import morgan from 'morgan';
import { logger, texLogger } from "./logger";
import * as fs from 'fs'
import { v4 as uuidv4 } from 'uuid'
import { spawn } from 'child_process'

const app = express();
const port = 8080;
const texInputDir = './texinputs'
const texOutputDir = './pdfs'

const morganTokens = ':remote-addr :method :url :status :res[content-length] bytes in :response-time ms';
app.use(morgan(morganTokens, { stream: { write: message => logger.info(message.trim()) } }))

app.use(express.json()) // for parsing application/json

app.post("/tex", (req, res) => {
    try {
        const uuid = uuidv4()
        const texFilename = `resume-${uuid}.tex`
        const pdfFilename = `resume-${uuid}.pdf`

        const texContents: string = req.body.texContents
        fs.writeFile(`${texInputDir}/${texFilename}`, texContents, (err) => {
            if (err) {
                logger.error(`Error occured during file writing: ${err}`)
                res.status(500).json({ "error": err })
            }
            logger.info(`Created file ${texFilename} with contents length ${texContents.length}`)

            // run pdflatex
            const pdfLatexSpawned = spawn("pdflatex", ["-output-directory", `${texOutputDir}`, `${texInputDir}/${texFilename}`])

            // log for debug
            pdfLatexSpawned.stderr.on('data', data => texLogger.error(data))
            pdfLatexSpawned.stdout.on('data', data => texLogger.debug(data))
            pdfLatexSpawned.on('error', error => logger.error(`pdflatex error: ${error}`))

            pdfLatexSpawned.on('close', code => {
                logger.debug(`pdflatex exited with code: ${code}`)
                res.status(200).json({
                    "status": "Successfully created PDF",
                    "pdfPath": `${texOutputDir}/${pdfFilename}`
                })
            })
        })
    } catch (error) {
        logger.error(`Error occured on /tex: ${error} in try catch block`)
        res.status(500).json({ "error": error })
    }
})

app.listen(port, () => {
    logger.info(`LaTeX microservice listening on port ${port}`);
})