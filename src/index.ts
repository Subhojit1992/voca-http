import { vocaCreate } from './core/vocaCreate';
import { createHttpRequest } from './core/httpInstance';
import { VocaRequestConfig } from './core/requestConfig';
import { trackProgress, uploadFile, downloadFile } from './core/fileHandling';
import { VocaHttp } from './types';

/**
 * Main library export with all HTTP methods and utilities
 */
export const voca: VocaHttp = {
  create: vocaCreate,
  
  get: (...args: any[]) => 
    createHttpRequest(['GET', ...args], new VocaRequestConfig().getConfig()),
    
  post: (...args: any[]) => 
    createHttpRequest(['POST', ...args], new VocaRequestConfig().getConfig()),
    
  patch: (...args: any[]) => 
    createHttpRequest(['PATCH', ...args], new VocaRequestConfig().getConfig()),
    
  put: (...args: any[]) => 
    createHttpRequest(['PUT', ...args], new VocaRequestConfig().getConfig()),
    
  delete: (...args: any[]) => 
    createHttpRequest(['DELETE', ...args], new VocaRequestConfig().getConfig()),
    
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