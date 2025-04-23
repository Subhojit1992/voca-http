import { ProgressEvent, ProgressCallback } from '../types';
/**
 * Track upload/download progress
 * @param progressEvent Progress event with loaded and total bytes
 * @param onProgress Callback function to report progress
 */
export declare const trackProgress: (progressEvent: ProgressEvent, onProgress: ProgressCallback) => void;
/**
 * Upload a file with progress tracking
 * @param url Target URL
 * @param file File to upload
 * @param headers Optional HTTP headers
 * @param onProgress Optional progress callback
 * @returns Promise with server response
 */
export declare const uploadFile: (url: string, file: File, headers?: HeadersInit, onProgress?: ProgressCallback) => Promise<any>;
/**
 * Download a file with progress tracking
 * @param url Target URL
 * @param headers Optional HTTP headers
 * @param onProgress Optional progress callback
 * @returns Promise with file content
 */
export declare const downloadFile: (url: string, headers?: HeadersInit, onProgress?: ProgressCallback) => Promise<string>;
