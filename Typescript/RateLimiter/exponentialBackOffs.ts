export interface BackOffsOptions {
    maxRetries: number;
    baseDelayMs: number;
    maxDelayMs: number;
}

export async function withExponentialBackOffs<T>(
    fn: () => Promise<T>,
    options: BackOffsOptions = { maxRetries: 5, baseDelayMs: 1000, maxDelayMs: 10000 }
): Promise<T> {

    let retries = 0;
    while(retries < options.maxRetries) {
        try {
            return await fn();
        } catch(err) {
            const isRetryable = err instanceof RateLimitError || isServerError(err);

            if(!isRetryable || retries === options.maxRetries)
                throw err
        }
    }

    return fn;
}
