import { rateLimit } from 'express-rate-limit'

const apiRateLimiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 10 minute
	limit: 600, // Limit each IP to 600 requests per `window` (here, per 10 minute).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Use an external store for consistency across multiple server instances.
})

export default apiRateLimiter;