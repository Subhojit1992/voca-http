import { vocaCreate } from './core/vocaCreate';
import { VocaRequestConfig } from './core/requestConfig';
import { trackProgress, uploadFile, downloadFile } from './core/fileHandling';
import { VocaHttp } from './types';

/**
 * Main library export with all HTTP methods and utilities
 */
export const voca: VocaHttp = {
  create: vocaCreate,
  
  get: (url: string, headers?: HeadersInit) => {
    const config = new VocaRequestConfig().getConfig();
    return vocaCreate(fetch, config)('GET', url, undefined, headers);
  },
    
  post: (url: string, data?: any, headers?: HeadersInit) => {
    const config = new VocaRequestConfig().getConfig();
    return vocaCreate(fetch, config)('POST', url, data, headers);
  },
    
  patch: (url: string, data?: any, headers?: HeadersInit) => {
    const config = new VocaRequestConfig().getConfig();
    return vocaCreate(fetch, config)('PATCH', url, data, headers);
  },
    
  put: (url: string, data?: any, headers?: HeadersInit) => {
    const config = new VocaRequestConfig().getConfig();
    return vocaCreate(fetch, config)('PUT', url, data, headers);
  },
    
  delete: (url: string, data?: any, headers?: HeadersInit) => {
    const config = new VocaRequestConfig().getConfig();
    return vocaCreate(fetch, config)('DELETE', url, data, headers);
  },
    
  config: new VocaRequestConfig(),
  trackProgress,
  uploadFile,
  downloadFile,
};

// Export individual components for advanced usage
export * from './types';
export { vocaCreate } from './core/vocaCreate';
export { HttpBase } from './core/httpBase';
export { VocaRequestConfig } from './core/requestConfig';
export { trackProgress, uploadFile, downloadFile } from './core/fileHandling'; 