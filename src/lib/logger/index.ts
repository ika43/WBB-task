import * as winston from 'winston';

const logger: winston.Logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.simple()
  ),
  level: 'debug',
  transports: [
    new winston.transports.Console()
  ]
});

export default logger;