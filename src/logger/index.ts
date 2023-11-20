// ================== Logger Configurations =================

import { Logger } from "winston";
import devLogger from "./dev/devLogger";

let logger: Logger | null = null;

if (process.env.NODE_ENV === "development") {
  logger = devLogger();
}

export default logger;
