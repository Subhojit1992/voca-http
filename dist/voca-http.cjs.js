'use strict';

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
 * @returns Configured fetch function with HTTP methods
 */
const vocaCreate = (fetch, { baseUrl = '', // Base URL to be added to the request URI
onError = (reason) => Promise.reject(reason), onRequest = undefined, onRequestError = onError, onResponse = (response) => Promise.resolve(response), onResponseError = onError, interceptors = { request: [], response: [] }, retryCount = 3, // Default retry count
timeout = 5000, // Default timeout in ms
 } = {}) => {
    // Default request handler if none provided
    const defaultRequestHandler = (method, url, data, headers) => {
        let body;
        const reqHeaders = Object.assign({ 'Content-Type': 'application/json' }, (headers || {}));
        if (data instanceof FormData) {
            body = data;
            delete reqHeaders['Content-Type'];
        }
        else if (data !== undefined) {
            body = JSON.stringify(data);
        }
        return {
            url: url,
            method: method,
            body,
            headers: reqHeaders
        };
    };
    // Use provided onRequest or default
    const requestHandler = onRequest || defaultRequestHandler;
    // Create base request handler
    const request = (...args) => {
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
        }
        catch (reason) {
            return onRequestError(reason);
        }
    };
    // Create HTTP method handlers
    const createRequestWithBody = (method) => (url, data, headers) => request(method, url, data, headers);
    const createRequestWithoutBody = (method) => (url, headers) => request(method, url, undefined, headers);
    // Return enhanced API object with all methods
    const api = request;
    api.get = createRequestWithoutBody('GET');
    api.post = createRequestWithBody('POST');
    api.put = createRequestWithBody('PUT');
    api.patch = createRequestWithBody('PATCH');
    api.delete = createRequestWithBody('DELETE');
    // Add the upload file method
    api.uploadFile = (url, file, headers = {}, onProgress) => {
        // Check if URL is absolute (starts with http:// or https://)
        const isAbsoluteUrl = url.startsWith('http://') || url.startsWith('https://');
        const fullUrl = isAbsoluteUrl ? url : `${baseUrl}${url}`;
        // Dynamic import to avoid circular dependencies
        return Promise.resolve().then(function () { return fileHandling; }).then(module => {
            return module.uploadFile(fullUrl, file, headers, onProgress);
        });
    };
    return api;
};

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
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        // Add progress tracking if callback is provided
        if (onProgress) {
            xhr.upload.addEventListener('progress', (event) => {
                if (event.lengthComputable) {
                    const percent = (event.loaded / event.total) * 100;
                    onProgress(percent);
                }
            });
        }
        xhr.open('POST', url);
        // Add headers
        Object.entries(headers).forEach(([key, value]) => {
            xhr.setRequestHeader(key, value);
        });
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    resolve(response);
                }
                catch (e) {
                    resolve(xhr.responseText);
                }
            }
            else {
                reject(new Error(`HTTP Error: ${xhr.status}`));
            }
        };
        xhr.onerror = () => {
            reject(new Error('Network Error'));
        };
        xhr.send(formData);
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

var fileHandling = /*#__PURE__*/Object.freeze({
    __proto__: null,
    downloadFile: downloadFile,
    trackProgress: trackProgress,
    uploadFile: uploadFile
});

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
 * Main library export with all HTTP methods and utilities
 */
const voca = {
    create: vocaCreate,
    get: (url, headers) => {
        const config = new VocaRequestConfig().getConfig();
        return vocaCreate(fetch, config)('GET', url, undefined, headers);
    },
    post: (url, data, headers) => {
        const config = new VocaRequestConfig().getConfig();
        return vocaCreate(fetch, config)('POST', url, data, headers);
    },
    patch: (url, data, headers) => {
        const config = new VocaRequestConfig().getConfig();
        return vocaCreate(fetch, config)('PATCH', url, data, headers);
    },
    put: (url, data, headers) => {
        const config = new VocaRequestConfig().getConfig();
        return vocaCreate(fetch, config)('PUT', url, data, headers);
    },
    delete: (url, data, headers) => {
        const config = new VocaRequestConfig().getConfig();
        return vocaCreate(fetch, config)('DELETE', url, data, headers);
    },
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
//# sourceMappingURL=voca-http.cjs.js.map
