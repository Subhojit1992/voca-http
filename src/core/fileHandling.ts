import { ProgressEvent, ProgressCallback } from '../types';

/**
 * Track upload/download progress
 * @param progressEvent Progress event with loaded and total bytes
 * @param onProgress Callback function to report progress
 */
export const trackProgress = (progressEvent: ProgressEvent, onProgress: ProgressCallback): void => {
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
export const uploadFile = (
  url: string,
  file: File,
  headers: HeadersInit = {},
  onProgress?: ProgressCallback
): Promise<any> => {
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
      xhr.setRequestHeader(key, value as string);
    });
    
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          resolve(response);
        } catch (e) {
          resolve(xhr.responseText);
        }
      } else {
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
export const downloadFile = (
  url: string,
  headers: HeadersInit = {},
  onProgress?: ProgressCallback
): Promise<string> => {
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
        return new Response(
          new ReadableStream({
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
          })
        );
      }
      
      return response;
    })
    .then(response => response.text())
    .catch((error) => {
      console.error('Download error:', error);
      throw error;
    });
}; 