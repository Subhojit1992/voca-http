import { VocaConfig, RequestOptions } from '../types';

/**
 * Creates a base HTTP client with interceptors and configuration
 * @param fetch Native fetch function to use
 * @param config Configuration options
 * @returns Configured fetch function
 */
export const vocaCreate = (
  fetch: typeof globalThis.fetch,
  {
    baseUrl = '', // Base URL to be added to the request URI
    onError = (reason: any) => Promise.reject(reason),
    onRequest = (options: any) => options,
    onRequestError = onError,
    onResponse = (response: Response) => Promise.resolve(response),
    onResponseError = onError,
    interceptors = { request: [], response: [] },
    retryCount = 3, // Default retry count
    timeout = 5000, // Default timeout in ms
  }: VocaConfig = {}
): (...args: any[]) => Promise<any> => {
  return (...args: any[]): Promise<any> => {
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
      let options = onRequest(...args);

      // Execute request interceptors
      interceptors.request.forEach((interceptor) => {
        const interceptedOptions = interceptor(options);
        if (interceptedOptions) {
          options = interceptedOptions;
        }
      });

      // Add the base URL to the URI
      options.url = `${baseUrl}${options.url}`;

      return fetchWithRetry(options).finally(() => clearTimeout(timeoutId)); // Cleanup timeout
    } catch (reason) {
      return onRequestError(reason);
    }
  };
}; 