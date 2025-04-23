(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.vocaHttp = {}));
})(this, (function (exports) { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise, SuppressedError, Symbol, Iterator */


    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    /**
     * Creates a base HTTP client with interceptors and configuration
     * @param fetch Native fetch function to use
     * @param config Configuration options
     * @returns Configured fetch function
     */
    const vocaCreate = (fetch, { baseUrl = '', // Base URL to be added to the request URI
    onError = (reason) => Promise.reject(reason), onRequest = (options) => options, onRequestError = onError, onResponse = (response) => Promise.resolve(response), onResponseError = onError, interceptors = { request: [], response: [] }, retryCount = 3, // Default retry count
    timeout = 5000, // Default timeout in ms
     } = {}) => {
        return (...args) => {
            let retries = 0;
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), timeout); // Timeout handling
            const fetchWithRetry = (options) => {
                return fetch(options.url, Object.assign(Object.assign({}, options), { signal: controller.signal }))
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
                    .catch((error) => __awaiter(void 0, void 0, void 0, function* () {
                    if (retries < retryCount && error.name !== 'AbortError') {
                        retries += 1;
                        console.log(`Retrying... Attempt ${retries}`);
                        return fetchWithRetry(options); // Retry logic
                    }
                    return onResponseError(error); // Handle error after retries
                }));
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
            }
            catch (reason) {
                return onRequestError(reason);
            }
        };
    };

    /**
     * Base class for HTTP functionality
     */
    class HttpBase {
        constructor() {
            this.httpMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
        }
        /**
         * Gets the global environment (browser or node)
         */
        getEnv() {
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
        getHttpMethods() {
            return this.httpMethods;
        }
    }

    /**
     * Factory function to create an HTTP request
     * @param args Arguments for request (method, uri, data)
     * @param config Request configuration
     * @returns Promise with request result
     */
    function createHttpRequest(args, config) {
        const instance = new HttpInstance(args, config);
        return instance.execute();
    }
    /**
     * Class for handling HTTP requests with different methods
     */
    class HttpInstance {
        /**
         * Create an HTTP instance
         * @param args Arguments for request (method, uri, data)
         * @param config Request configuration
         */
        constructor(args, config) {
            this.method = null;
            this.base = new HttpBase();
            this.uri = args[1];
            this.data = args[2];
            this.vocaInstance = this._vocaItem(config);
            if (args.includes('GET')) {
                this.method = 'GET';
            }
            else if (args.includes('POST')) {
                this.method = 'POST';
            }
            else if (args.includes('PATCH')) {
                this.method = 'PATCH';
            }
            else if (args.includes('PUT')) {
                this.method = 'PUT';
            }
            else if (args.includes('DELETE')) {
                this.method = 'DELETE';
            }
        }
        /**
         * Execute the HTTP request
         * @returns Promise with request result
         */
        execute() {
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
        _vocaItem(config) {
            return vocaCreate(this.base.getEnv().fetch, Object.assign(Object.assign({}, config), { onRequest: (method, route, data = undefined, customHeaders = {}) => {
                    let body;
                    let headers = Object.assign({ 'Content-Type': 'application/json' }, customHeaders);
                    if (data instanceof FormData) {
                        body = data; // If it's FormData, don't set Content-Type
                        delete headers['Content-Type']; // Do not set Content-Type for FormData
                    }
                    else if (data) {
                        body = JSON.stringify(data); // For non-FormData, send as JSON
                    }
                    return {
                        url: `${route}`,
                        body,
                        method,
                        headers,
                    };
                }, onResponse: (response) => {
                    if (response.status === 403)
                        throw new Error('Authorization error.');
                    return response.json();
                }, onError: () => {
                    return Promise.reject();
                } }));
        }
    }

    /**
     * Default configuration for a request
     */
    class VocaRequestConfig {
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
        addRequestInterceptor(interceptor) {
            this.interceptors.request.push(interceptor);
        }
        /**
         * Add response interceptor
         * @param interceptor Function to intercept and modify response
         */
        addResponseInterceptor(interceptor) {
            this.interceptors.response.push(interceptor);
        }
        /**
         * Set timeout for requests
         * @param timeout Timeout in milliseconds
         */
        setTimeout(timeout) {
            this.timeout = timeout;
        }
        /**
         * Set number of retry attempts
         * @param count Number of retries
         */
        setRetryCount(count) {
            this.retryCount = count;
        }
        /**
         * Get the current configuration
         */
        getConfig() {
            return {
                interceptors: this.interceptors,
                timeout: this.timeout,
                retryCount: this.retryCount,
            };
        }
    }

    /**
     * Track upload/download progress
     * @param progressEvent Progress event with loaded and total bytes
     * @param onProgress Callback function to report progress
     */
    const trackProgress = (progressEvent, onProgress) => {
        if (progressEvent.lengthComputable) {
            const percent = (progressEvent.loaded / progressEvent.total) * 100;
            onProgress(percent); // Update the progress with percentage
        }
    };
    /**
     * Upload a file with progress tracking
     * @param url Target URL
     * @param file File to upload
     * @param headers Optional HTTP headers
     * @param onProgress Optional progress callback
     * @returns Promise with server response
     */
    const uploadFile = (url, file, headers = {}, onProgress) => {
        const formData = new FormData();
        formData.append('file', file);
        return fetch(url, {
            method: 'POST',
            body: formData,
            headers,
        })
            .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }
            return response.json();
        })
            .catch((error) => {
            console.error('Upload error:', error);
            throw error;
        });
    };
    /**
     * Download a file with progress tracking
     * @param url Target URL
     * @param headers Optional HTTP headers
     * @param onProgress Optional progress callback
     * @returns Promise with file content
     */
    const downloadFile = (url, headers = {}, onProgress) => {
        return fetch(url, {
            method: 'GET',
            headers,
        })
            .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }
            const contentLength = response.headers.get('Content-Length');
            const total = contentLength ? parseInt(contentLength, 10) : 0;
            let loaded = 0;
            // Only track progress if we have a callback and content length
            if (onProgress && total && response.body) {
                const body = response.body;
                return new Response(new ReadableStream({
                    start(controller) {
                        const reader = body.getReader();
                        function read() {
                            reader.read().then(({ done, value }) => {
                                if (done) {
                                    controller.close();
                                    return;
                                }
                                loaded += value.length;
                                if (onProgress) {
                                    onProgress((loaded / total) * 100);
                                }
                                controller.enqueue(value);
                                read();
                            }).catch(error => {
                                console.error('Download stream error:', error);
                                controller.error(error);
                            });
                        }
                        read();
                    }
                }));
            }
            return response;
        })
            .then(response => response.text())
            .catch((error) => {
            console.error('Download error:', error);
            throw error;
        });
    };

    /**
     * Main library export with all HTTP methods and utilities
     */
    const voca = {
        create: vocaCreate,
        get: (...args) => createHttpRequest(['GET', ...args], new VocaRequestConfig().getConfig()),
        post: (...args) => createHttpRequest(['POST', ...args], new VocaRequestConfig().getConfig()),
        patch: (...args) => createHttpRequest(['PATCH', ...args], new VocaRequestConfig().getConfig()),
        put: (...args) => createHttpRequest(['PUT', ...args], new VocaRequestConfig().getConfig()),
        delete: (...args) => createHttpRequest(['DELETE', ...args], new VocaRequestConfig().getConfig()),
        config: new VocaRequestConfig(),
        trackProgress,
        uploadFile,
        downloadFile,
    };

    exports.HttpBase = HttpBase;
    exports.VocaRequestConfig = VocaRequestConfig;
    exports.downloadFile = downloadFile;
    exports.trackProgress = trackProgress;
    exports.uploadFile = uploadFile;
    exports.voca = voca;
    exports.vocaCreate = vocaCreate;

}));
//# sourceMappingURL=voca-http.umd.js.map
