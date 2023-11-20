import morgan from "morgan";

const morganLogger = () => {
  const logger = morgan(
    '[:date[web]] :remote-addr - :remote-user :method :url HTTP/:http-version :status :total-time[digits]ms :res[content-length] ":referrer" ":user-agent"'
  );

  return logger;
};

export default morganLogger;
