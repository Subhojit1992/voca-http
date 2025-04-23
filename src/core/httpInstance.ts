import { HttpBase } from './httpBase';
import { vocaCreate } from './vocaCreate';
import { HttpMethod, VocaInstance, RequestConfig, RequestOptions } from '../types';

/**
 * Factory function to create an HTTP request
 * @param args Arguments for request (method, uri, data)
 * @param config Request configuration
 * @returns Promise with request result
 */
export function createHttpRequest(args: any[], config: RequestConfig | any): Promise<any> {
  const instance = new HttpInstance(args, config);
  return instance.execute();
}

/**
 * Class for handling HTTP requests with different methods
 */
export class HttpInstance {
  private base: HttpBase;
  private uri: string;
  private vocaInstance: VocaInstance;
  private method: HttpMethod | null = null;
  private data: any;
  private headers: HeadersInit;

  /**
   * Create an HTTP instance
   * @param args Arguments for request (method, uri, data)
   * @param config Request configuration
   */
  constructor(args: any[], config: RequestConfig | any) {
    this.base = new HttpBase();
    this.method = args[0] as HttpMethod;
    this.uri = args[1];
    this.data = args[2];
    this.headers = args[3] || {};
    this.vocaInstance = this._vocaItem(config);
  }
  
  /**
   * Execute the HTTP request
   * @returns Promise with request result
   */
  public execute(): Promise<any> {
    if (!this.method) {
      return Promise.reject(new Error('Invalid HTTP method'));
    }
    
    if (this.method === 'GET' || this.method === 'DELETE') {
      return this.vocaInstance(this.method, this.uri, undefined, this.headers);
    }
    
    return this.vocaInstance(this.method, this.uri, this.data, this.headers);
  }

  /**
   * Create a voca instance with configuration
   * @param config Request configuration
   * @returns Configured voca instance
   */
  private _vocaItem(config: RequestConfig | any): VocaInstance {
    return vocaCreate(this.base.getEnv().fetch, {
      ...config,
      onRequest: (method: HttpMethod, route: string, data: any = undefined, customHeaders: HeadersInit = {}) => {
        let body: BodyInit | undefined;
        let headers: HeadersInit = {
          'Content-Type': 'application/json', // Default to application/json
          ...customHeaders, // Merge custom headers (can override Content-Type)
        };

        if (data instanceof FormData) {
          body = data; // If it's FormData, don't set Content-Type
          delete (headers as Record<string, string>)['Content-Type']; // Do not set Content-Type for FormData
        } else if (data) {
          body = JSON.stringify(data); // For non-FormData, send as JSON
        }

        return {
          url: route,
          body,
          method,
          headers,
        } as RequestOptions;
      },
    });
  }
} 