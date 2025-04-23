import { HttpMethod } from '../types';
/**
 * Base class for HTTP functionality
 */
export declare class HttpBase {
    private httpMethods;
    constructor();
    /**
     * Gets the global environment (browser or node)
     */
    getEnv(): Window | typeof globalThis;
    /**
     * Gets available HTTP methods
     */
    getHttpMethods(): HttpMethod[];
}
