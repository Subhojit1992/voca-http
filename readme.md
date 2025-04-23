# Voca HTTP

 <img src="https://raw.githubusercontent.com/Subhojit1992/voca-http/master/docs/public/images/voca-logo.png" alt="voca-http logo" width="130" height="130" />

A lightweight and flexible HTTP client for browser and Node.js environments. Inspired by Axios, with support for interceptors, progress tracking, and TypeScript.

[![npm version](https://img.shields.io/npm/v/voca-http.svg)](https://www.npmjs.com/package/voca-http)
[![License](https://img.shields.io/npm/l/voca-http.svg)](LICENSE)

#### Demo and Doc - https://vocahttp.netlify.app/

## Features

- 📦 Promise-based HTTP client
- 🔄 Request and response interceptors
- ⏱️ Automatic request timeout
- 🔁 Built-in request retry
- 📊 Upload and download progress tracking
- 📁 Easy file uploads with FormData handling
- 🧩 TypeScript support
- 🌳 Tree-shakable (ESM)
- 🪶 Lightweight (no dependencies)
- 🧠 Works in both browser and Node.js environments

## Installation

```bash
# npm
npm install voca-http

# yarn
yarn add voca-http

# pnpm
pnpm add voca-http
```

## Basic Usage

```typescript
import { voca } from 'voca-http';

// Simple GET request
voca.get('https://jsonplaceholder.typicode.com/posts')
  .then(response => console.log(response))
  .catch(error => console.error(error));

// POST request with data
voca.post('https://jsonplaceholder.typicode.com/posts', {
  title: 'foo',
  body: 'bar',
  userId: 1
})
  .then(response => console.log(response))
  .catch(error => console.error(error));

// Using async/await
async function fetchData() {
  try {
    const posts = await voca.get('https://jsonplaceholder.typicode.com/posts');
    console.log(posts);
  } catch (error) {
    console.error(error);
  }
}
```

## Advanced Configuration

### Creating a Custom Instance

You can create a custom instance with specific configuration:

```typescript
import { voca } from 'voca-http';

const api = voca.create(fetch, {
  baseUrl: 'https://api.example.com',
  timeout: 5000, // 5 seconds
  retryCount: 2, // Retry twice on failure
  onResponse: (response) => {
    // Custom response handler
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    return response.json();
  }
});

// Now use the custom instance
api('GET', '/users')
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

### Using Interceptors

```typescript
import { voca } from 'voca-http';

// Add request interceptor
voca.config.addRequestInterceptor((options) => {
  // Add authorization header to each request
  options.headers = {
    ...options.headers,
    'Authorization': `Bearer ${getToken()}`
  };
  return options;
});

// Add response interceptor
voca.config.addResponseInterceptor((response) => {
  // Log all responses
  console.log(`Response from ${response.url} with status ${response.status}`);
  return response;
});
```

## File Uploads and Progress Tracking

```typescript
import { voca } from 'voca-http';

// File upload with progress tracking
const fileInput = document.querySelector<HTMLInputElement>('#fileInput');
const progressBar = document.querySelector<HTMLDivElement>('#progressBar');

if (fileInput?.files?.[0]) {
  const file = fileInput.files[0];
  
  voca.uploadFile(
    'https://api.example.com/upload',
    file,
    { 'X-Custom-Header': 'value' },
    (progress) => {
      // Update progress bar
      if (progressBar) {
        progressBar.style.width = `${progress}%`;
        progressBar.textContent = `${Math.round(progress)}%`;
      }
    }
  )
    .then(response => console.log('Upload complete', response))
    .catch(error => console.error('Upload failed', error));
}
```

## Timeout and Retry Configuration

```typescript
import { voca } from 'voca-http';

// Set global timeout
voca.config.setTimeout(10000); // 10 seconds

// Set global retry count
voca.config.setRetryCount(3); // Retry 3 times

// Or customize per instance
const api = voca.create(fetch, {
  timeout: 30000, // 30 seconds timeout for this instance
  retryCount: 5   // 5 retries for this instance
});
```

## API Reference

### Main Methods

- `voca.get(url: string, headers?: HeadersInit): Promise<any>`
- `voca.post(url: string, data?: any, headers?: HeadersInit): Promise<any>`
- `voca.put(url: string, data?: any, headers?: HeadersInit): Promise<any>`
- `voca.patch(url: string, data?: any, headers?: HeadersInit): Promise<any>`
- `voca.delete(url: string, data?: any, headers?: HeadersInit): Promise<any>`

### Factory Method

- `voca.create(fetch: typeof globalThis.fetch, config?: VocaConfig): Function`

### Configuration

- `voca.config.addRequestInterceptor(interceptor: RequestInterceptor): void`
- `voca.config.addResponseInterceptor(interceptor: ResponseInterceptor): void`
- `voca.config.setTimeout(timeout: number): void`
- `voca.config.setRetryCount(count: number): void`

### File Handling

- `voca.uploadFile(url: string, file: File, headers?: HeadersInit, onProgress?: ProgressCallback): Promise<any>`
- `voca.downloadFile(url: string, headers?: HeadersInit, onProgress?: ProgressCallback): Promise<string>`
- `voca.trackProgress(progressEvent: ProgressEvent, onProgress: ProgressCallback): void`

## Browser Support

voca-http works in all modern browsers that support the Fetch API:

- Chrome ≥ 42
- Firefox ≥ 39
- Safari ≥ 10.1
- Edge ≥ 14

For older browsers, use a Fetch polyfill.

## Node.js Support

For Node.js, you need to provide a fetch implementation, like node-fetch:

```typescript
import fetch from 'node-fetch';
import { voca } from 'voca-http';

const api = voca.create(fetch, {
  baseUrl: 'https://api.example.com'
});
```

## Examples

Check out the examples directory for more detailed usage:

- [Browser/HTML usage](examples/html/index.html)
- [React usage](examples/react/App.tsx)

## License

[MIT](LICENSE) 