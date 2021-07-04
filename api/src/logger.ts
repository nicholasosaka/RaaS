import winston from 'winston';

const loggingPath = 'logs/raas_api.log';

export const logger = winston.createLogger({
    transports: [
        new winston.transports.File({
            filename: loggingPath,
            level: 'info',
        }),
        new winston.transports.Console({
            level: 'debug',
            format: winston.format.combine(
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                winston.format.splat(),
                winston.format.colorize(),
                winston.format.printf(({ level, message, label, timestamp }) => `${timestamp} ${label || '-'} ${level}: ${message}`),
            )
        })
    ],
    exitOnError: false
})
