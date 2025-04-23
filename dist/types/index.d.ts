import { VocaHttp } from './types';
/**
 * Main library export with all HTTP methods and utilities
 */
export declare const voca: VocaHttp;
export * from './types';
export { vocaCreate } from './core/vocaCreate';
export { HttpBase } from './core/httpBase';
export { VocaRequestConfig } from './core/requestConfig';
export { trackProgress, uploadFile, downloadFile } from './core/fileHandling';
