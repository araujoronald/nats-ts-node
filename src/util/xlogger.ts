import pino from 'pino'
import PinoPretty from 'pino-pretty'

const stream = PinoPretty({
    colorize: true,
    ignore: 'pid, hostname'
})

export const Logger = pino({
    level: process.env.LOG_LEVEL || 'info'
}, stream)
