import { RequestConfig } from '../types';
/**
 * Factory function to create an HTTP request
 * @param args Arguments for request (method, uri, data)
 * @param config Request configuration
 * @returns Promise with request result
 */
export declare function createHttpRequest(args: any[], config: RequestConfig | any): Promise<any>;
/**
 * Class for handling HTTP requests with different methods
 */
export declare class HttpInstance {
    private base;
    private uri;
    private vocaInstance;
    private method;
    private data;
    private headers;
    /**
     * Create an HTTP instance
     * @param args Arguments for request (method, uri, data)
     * @param config Request configuration
     */
    constructor(args: any[], config: RequestConfig | any);
    /**
     * Execute the HTTP request
     * @returns Promise with request result
     */
    execute(): Promise<any>;
    /**
     * Create a voca instance with configuration
     * @param config Request configuration
     * @returns Configured voca instance
     */
    private _vocaItem;
}
