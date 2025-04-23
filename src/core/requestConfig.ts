import { RequestConfig, RequestInterceptor, ResponseInterceptor } from '../types';

/**
 * Default configuration for a request
 */
export class VocaRequestConfig implements RequestConfig {
  public interceptors: {
    request: RequestInterceptor[];
    response: ResponseInterceptor[];
  };
  public timeout: number;
  public retryCount: number;

  constructor() {
    this.interceptors = {
      request: [],
      response: [],
    };
    this.timeout = 5000; // Default timeout in ms
    this.retryCount = 3; // Default retry count
  }

  /**
   * Add request interceptor
   * @param interceptor Function to intercept and modify request
   */
  public addRequestInterceptor(interceptor: RequestInterceptor): void {
    this.interceptors.request.push(interceptor);
  }

  /**
   * Add response interceptor
   * @param interceptor Function to intercept and modify response
   */
  public addResponseInterceptor(interceptor: ResponseInterceptor): void {
    this.interceptors.response.push(interceptor);
  }

  /**
   * Set timeout for requests
   * @param timeout Timeout in milliseconds
   */
  public setTimeout(timeout: number): void {
    this.timeout = timeout;
  }

  /**
   * Set number of retry attempts
   * @param count Number of retries
   */
  public setRetryCount(count: number): void {
    this.retryCount = count;
  }

  /**
   * Get the current configuration
   */
  public getConfig() {
    return {
      interceptors: this.interceptors,
      timeout: this.timeout,
      retryCount: this.retryCount,
    };
  }
} 