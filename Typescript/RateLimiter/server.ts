import { TokenBucketRateLimiter } from "./RateLimiter";

/**
 * Demo usage of ratelimiter
 */

const rateLimiter = new TokenBucketRateLimiter(10, 5);

if(rateLimiter.isRequestAllowd('random-client-id'))
    console.log(`Request is getting processed`);
else
    console.log(`Throw 429 - TooManyRequests Error`);