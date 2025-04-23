export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export interface RequestOptions extends RequestInit {
    url: string;
    method: HttpMethod;
    body?: BodyInit | null;
    headers?: HeadersInit;
    signal?: AbortSignal;
}
export type RequestInterceptor = (options: RequestOptions) => RequestOptions | void;
export type ResponseInterceptor = (response: Response) => Response | void;
export interface VocaConfig {
    baseUrl?: string;
    onError?: (reason: any) => Promise<any>;
    onRequest?: (method: string, url: string, data?: any, headers?: HeadersInit) => RequestOptions;
    onRequestError?: (reason: any) => Promise<any>;
    onResponse?: (response: Response) => Promise<any>;
    onResponseError?: (error: Error) => Promise<any>;
    interceptors?: {
        request: RequestInterceptor[];
        response: ResponseInterceptor[];
    };
    retryCount?: number;
    timeout?: number;
}
export interface ProgressEvent {
    loaded: number;
    total: number;
    lengthComputable: boolean;
}
export type ProgressCallback = (percent: number) => void;
export interface RequestConfig {
    interceptors: {
        request: RequestInterceptor[];
        response: ResponseInterceptor[];
    };
    timeout: number;
    retryCount: number;
    getConfig: () => {
        interceptors: {
            request: RequestInterceptor[];
            response: ResponseInterceptor[];
        };
        timeout: number;
        retryCount: number;
    };
    addRequestInterceptor: (interceptor: RequestInterceptor) => void;
    addResponseInterceptor: (interceptor: ResponseInterceptor) => void;
    setTimeout: (timeout: number) => void;
    setRetryCount: (count: number) => void;
}
export interface VocaInstance {
    (method: HttpMethod, route: string, data?: any, customHeaders?: HeadersInit): Promise<any>;
}
export interface VocaHttp {
    create: (fetch: typeof globalThis.fetch, config?: VocaConfig) => (...args: any[]) => Promise<any>;
    get: (url: string, headers?: HeadersInit) => Promise<any>;
    post: (url: string, data?: any, headers?: HeadersInit) => Promise<any>;
    put: (url: string, data?: any, headers?: HeadersInit) => Promise<any>;
    patch: (url: string, data?: any, headers?: HeadersInit) => Promise<any>;
    delete: (url: string, data?: any, headers?: HeadersInit) => Promise<any>;
    config: RequestConfig;
    trackProgress: (progressEvent: ProgressEvent, onProgress: ProgressCallback) => void;
    uploadFile: (url: string, file: File, headers?: HeadersInit, onProgress?: ProgressCallback) => Promise<any>;
    downloadFile: (url: string, headers?: HeadersInit, onProgress?: ProgressCallback) => Promise<any>;
}
