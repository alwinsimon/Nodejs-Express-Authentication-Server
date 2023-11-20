import winston, { Logger } from "winston";
import path from "path";

// Type for the logger configuration
export interface LoggerConfig {
  level: string;
  format: winston.Logform.Format;
  defaultMeta: Record<string, any>;
  transports: winston.transport[];
}

const devLogger = (): Logger => {
  // Define the directory for log files
  const devLogDirectory = path.join(__dirname, "../dev/logs");

  // devLogger configuration
  const devLoggerConfig: LoggerConfig = {
    level: "debug",
    format: winston.format.json(),
    defaultMeta: { service: "Auth-server" },
    transports: [
      // Logger instance to log to console (terminal)
      // new winston.transports.Console(),

      // Logger instance to log errors to log file in logs directory.
      new winston.transports.File({
        filename: path.join(devLogDirectory, "error.log"),
        level: "error",
      }),

      // Logger instance to log all logs to log file in logs directory.
      new winston.transports.File({
        filename: path.join(devLogDirectory, "complete.log"),
      }),
    ],
  };

  // Create and return the logger
  const logger = winston.createLogger(devLoggerConfig);
  return logger;
};

export default devLogger;
