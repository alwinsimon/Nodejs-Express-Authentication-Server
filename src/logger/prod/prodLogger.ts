import path from "path";

import winston, { Logger, format } from "winston";
const { combine, timestamp } = format;

// Type for the logger configuration
export interface LoggerConfig {
  level: string;
  format: winston.Logform.Format;
  defaultMeta: Record<string, any>;
  transports: winston.transport[];
}

const prodLogger = (): Logger => {
  // Define the directory for log files
  const prodLogDirectory = path.join(__dirname, "../prod/logs");

  // prodLogger configuration
  const prodLoggerConfig: LoggerConfig = {
    level: "debug",
    format: combine(timestamp(), winston.format.json()),
    defaultMeta: { service: "Auth-server-prod" },
    transports: [
      // Logger instance to log to console (terminal)
      // new winston.transports.Console(),

      // Logger instance to log errors to log file in logs directory.
      new winston.transports.File({
        filename: path.join(prodLogDirectory, "error.log"),
        level: "error",
      }),

      // Logger instance to log all logs to log file in logs directory.
      new winston.transports.File({
        filename: path.join(prodLogDirectory, "complete.log"),
      }),
    ],
  };

  // Create and return the logger
  const logger = winston.createLogger(prodLoggerConfig);
  return logger;
};

export default prodLogger;
