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

  /**
   * Create an HTTP instance
   * @param args Arguments for request (method, uri, data)
   * @param config Request configuration
   */
  constructor(args: any[], config: RequestConfig | any) {
    this.base = new HttpBase();
    this.uri = args[1];
    this.data = args[2];
    this.vocaInstance = this._vocaItem(config);
    
    if (args.includes('GET')) {
      this.method = 'GET';
    } else if (args.includes('POST')) {
      this.method = 'POST';
    } else if (args.includes('PATCH')) {
      this.method = 'PATCH';
    } else if (args.includes('PUT')) {
      this.method = 'PUT';
    } else if (args.includes('DELETE')) {
      this.method = 'DELETE';
    }
  }
  
  /**
   * Execute the HTTP request
   * @returns Promise with request result
   */
  public execute(): Promise<any> {
    if (!this.method) {
      return Promise.reject(new Error('Invalid HTTP method'));
    }
    
    if (this.method === 'GET') {
      return this.vocaInstance(this.method, this.uri);
    }
    
    return this.vocaInstance(this.method, this.uri, this.data);
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
          url: `${route}`,
          body,
          method,
          headers,
        } as RequestOptions;
      },
      onResponse: (response: Response) => {
        if (response.status === 403) throw new Error('Authorization error.');
        return response.json();
      },
      onError: () => {
        return Promise.reject();
      },
    });
  }
} 