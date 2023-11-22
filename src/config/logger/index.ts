// ================== Logger Configurations =================

import { Logger } from "winston";

import devLogger from "./dev/devLogger";
import prodLogger from "./prod/prodLogger";

let logger: Logger | null = null;

if (process.env.NODE_ENV === "development") {
  logger = devLogger();
}

if (process.env.NODE_ENV === "production") {
  logger = prodLogger();
}

export default logger;
