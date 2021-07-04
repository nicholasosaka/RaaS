import winston from 'winston';

const loggingPath = 'logs/api';

export const logger = winston.createLogger({
    transports: [
        new winston.transports.File({
            filename: `${loggingPath}_json.log`,
            level: 'info',
        }),
        new winston.transports.File({
            filename: `${loggingPath}.log`,
            format: winston.format.combine(
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                winston.format.splat(),
                winston.format.printf(({ level, message, label, timestamp }) => `${timestamp} ${label || '-'} ${level}: ${message}`),
            ),
            level: 'info'
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
