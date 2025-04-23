import { VocaConfig, RequestOptions } from '../types';

/**
 * Creates a base HTTP client with interceptors and configuration
 * @param fetch Native fetch function to use
 * @param config Configuration options
 * @returns Configured fetch function with HTTP methods
 */
export const vocaCreate = (
  fetch: typeof globalThis.fetch,
  {
    baseUrl = '', // Base URL to be added to the request URI
    onError = (reason: any) => Promise.reject(reason),
    onRequest = undefined,
    onRequestError = onError,
    onResponse = (response: Response) => Promise.resolve(response),
    onResponseError = onError,
    interceptors = { request: [], response: [] },
    retryCount = 3, // Default retry count
    timeout = 5000, // Default timeout in ms
  }: VocaConfig = {}
) => {
  // Default request handler if none provided
  const defaultRequestHandler = (method: string, url: string, data?: any, headers?: HeadersInit): RequestOptions => {
    let body: BodyInit | undefined;
    const reqHeaders: HeadersInit = {
      'Content-Type': 'application/json',
      ...(headers || {})
    };

    if (data instanceof FormData) {
      body = data;
      delete (reqHeaders as Record<string, string>)['Content-Type'];
    } else if (data !== undefined) {
      body = JSON.stringify(data);
    }

    return {
      url: url,
      method: method as any,
      body,
      headers: reqHeaders
    };
  };

  // Use provided onRequest or default
  const requestHandler = onRequest || defaultRequestHandler;

  // Create base request handler
  const request = (...args: any[]): Promise<any> => {
    let retries = 0;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout); // Timeout handling

    const fetchWithRetry = (options: RequestOptions): Promise<any> => {
      return fetch(options.url, { ...options, signal: controller.signal })
        .then((response) => {
          // Execute response interceptors
          interceptors.response.forEach((interceptor) => {
            const interceptedResponse = interceptor(response);
            if (interceptedResponse) {
              response = interceptedResponse;
            }
          });
          return onResponse(response);
        })
        .catch(async (error) => {
          if (retries < retryCount && error.name !== 'AbortError') {
            retries += 1;
            console.log(`Retrying... Attempt ${retries}`);
            return fetchWithRetry(options); // Retry logic
          }
          return onResponseError(error); // Handle error after retries
        });
    };

    try {
      // Extract arguments
      const [method, url, data, headers] = args;
      
      // Process request options
      let options = requestHandler(method, url, data, headers);

      // Execute request interceptors
      interceptors.request.forEach((interceptor) => {
        const interceptedOptions = interceptor(options);
        if (interceptedOptions) {
          options = interceptedOptions;
        }
      });

      // Add the base URL to the URI if it's not an absolute URL
      const isAbsoluteUrl = options.url.startsWith('http://') || options.url.startsWith('https://');
      if (!isAbsoluteUrl && baseUrl) {
        options.url = `${baseUrl}${options.url}`;
      }

      return fetchWithRetry(options).finally(() => clearTimeout(timeoutId)); // Cleanup timeout
    } catch (reason) {
      return onRequestError(reason);
    }
  };

  // Create HTTP method handlers
  const createRequestWithBody = (method: string) => 
    (url: string, data?: any, headers?: HeadersInit) => 
      request(method, url, data, headers);
  
  const createRequestWithoutBody = (method: string) => 
    (url: string, headers?: HeadersInit) => 
      request(method, url, undefined, headers);

  // Return enhanced API object with all methods
  const api = request as any;
  api.get = createRequestWithoutBody('GET');
  api.post = createRequestWithBody('POST');
  api.put = createRequestWithBody('PUT');
  api.patch = createRequestWithBody('PATCH');
  api.delete = createRequestWithBody('DELETE');

  // Add the upload file method
  api.uploadFile = (url: string, file: File, headers: HeadersInit = {}, onProgress?: (percent: number) => void) => {
    // Check if URL is absolute (starts with http:// or https://)
    const isAbsoluteUrl = url.startsWith('http://') || url.startsWith('https://');
    const fullUrl = isAbsoluteUrl ? url : `${baseUrl}${url}`;
    
    // Dynamic import to avoid circular dependencies
    return import('../core/fileHandling').then(module => {
      return module.uploadFile(fullUrl, file, headers, onProgress);
    });
  };

  return api;
}; 