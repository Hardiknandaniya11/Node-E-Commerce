import winston from 'winston';

const logger = winston.createLogger({
  level: 'info', // Default logging level for console
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.simple() // Simple format for logging
  ),
  transports: [
    new winston.transports.Console(),

    // Log only 'error' level messages to a file
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error', // Only logs errors to the file
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json() // Store error logs in JSON format with a timestamp
      ),
    })
  ]
});

export default logger;
