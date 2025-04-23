import { VocaConfig } from '../types';
/**
 * Creates a base HTTP client with interceptors and configuration
 * @param fetch Native fetch function to use
 * @param config Configuration options
 * @returns Configured fetch function with HTTP methods
 */
export declare const vocaCreate: (fetch: typeof globalThis.fetch, { baseUrl, onError, onRequest, onRequestError, onResponse, onResponseError, interceptors, retryCount, timeout, }?: VocaConfig) => any;
