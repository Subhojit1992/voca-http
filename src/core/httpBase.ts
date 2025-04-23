import { HttpMethod } from '../types';

/**
 * Base class for HTTP functionality
 */
export class HttpBase {
  private httpMethods: HttpMethod[];

  constructor() {
    this.httpMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
  }

  /**
   * Gets the global environment (browser or node)
   */
  public getEnv(): Window | typeof globalThis {
    if (typeof window !== 'undefined') {
      return window;
    }
    if (typeof global !== 'undefined') {
      return global;
    }
    return globalThis;
  }

  /**
   * Gets available HTTP methods
   */
  public getHttpMethods(): HttpMethod[] {
    return this.httpMethods;
  }
} 