import { RequestConfig, RequestInterceptor, ResponseInterceptor } from '../types';
/**
 * Default configuration for a request
 */
export declare class VocaRequestConfig implements RequestConfig {
    interceptors: {
        request: RequestInterceptor[];
        response: ResponseInterceptor[];
    };
    timeout: number;
    retryCount: number;
    constructor();
    /**
     * Add request interceptor
     * @param interceptor Function to intercept and modify request
     */
    addRequestInterceptor(interceptor: RequestInterceptor): void;
    /**
     * Add response interceptor
     * @param interceptor Function to intercept and modify response
     */
    addResponseInterceptor(interceptor: ResponseInterceptor): void;
    /**
     * Set timeout for requests
     * @param timeout Timeout in milliseconds
     */
    setTimeout(timeout: number): void;
    /**
     * Set number of retry attempts
     * @param count Number of retries
     */
    setRetryCount(count: number): void;
    /**
     * Get the current configuration
     */
    getConfig(): {
        interceptors: {
            request: RequestInterceptor[];
            response: ResponseInterceptor[];
        };
        timeout: number;
        retryCount: number;
    };
}
