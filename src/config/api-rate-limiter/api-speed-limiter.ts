import { slowDown } from "express-slow-down";

const apiSpeedLimiter = slowDown({
  windowMs: 10 * 60 * 1000, // 10 minute
  delayAfter: 610, // Allow 610 requests per 10 minutes (kept 600+10 as apiRateLimiter is set to 600) without slowing down.
  delayMs: (hits) => hits * 100, // Add 100 ms of delay to every request after the 610th one.

  /**
   * - requests 1-610 are not delayed.
   * - request 611 is delayed by 611 * 100 ms
   * - request 612 is delayed by 612 * 100 ms
   * - request 613 is delayed by 613 * 100 ms
   *
   * and so on.
   *
   * After 10 minutes, the delay is reset to 0.
   */
});

export default apiSpeedLimiter;
