import { rateLimit } from 'express-rate-limit'

const apiRateLimiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minute
	limit: 60, // Limit each IP to 60 requests per `window` (here, per 1 minute), ie, 1 request per 1 second.
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Use an external store for consistency across multiple server instances.
})

export default apiRateLimiter;