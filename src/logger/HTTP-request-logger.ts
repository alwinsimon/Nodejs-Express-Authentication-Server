import morgan from "morgan";
import logger from ".";

const morganLogger = () => {
  // Create a custom stream that writes to both Winston and console
  const dualStream = {
    write: (message: string) => {
      // Log to Winston
      logger!.info(message.trim());
      // Log to console
      console.log(message.trim());
    },
  };

  // Use the custom stream with morgan middleware
  const httpLogger = morgan(
    '[:date[web]] :remote-addr - :remote-user HTTP/:http-version :method :url STATUS: :status TotalTime: :total-time[digits]ms Content-length: :res[content-length] ":referrer" ":user-agent"',
    { stream: dualStream }
  );

  return httpLogger;
};

export default morganLogger;
