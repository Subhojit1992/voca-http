import React from 'react';
import styled from 'styled-components';
import Layout from '../src/components/Layout';
import Head from 'next/head';

const ApiContainer = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-top: 2.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--primary-color);

  &:first-child {
    margin-top: 0;
  }
`;

const SubsectionTitle = styled.h3`
  font-size: 1.5rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
`;

const MethodSignature = styled.div`
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
  font-family: 'Courier New', Courier, monospace;
  overflow-x: auto;
`;

const Paragraph = styled.p`
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
`;

const Th = styled.th`
  text-align: left;
  padding: 0.75rem;
  background-color: #f5f5f5;
  border-bottom: 2px solid var(--border-color);
`;

const Td = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid var(--border-color);
  vertical-align: top;
`;

const ApiMethodName = styled.h4`
  color: var(--dark-color);
  font-size: 1.25rem;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  font-family: 'Courier New', Courier, monospace;
`;

const Code = styled.code`
  background-color: #f1f1f1;
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.9em;
`;

const ApiPage: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>API Reference | voca-http</title>
        <meta name="description" content="API reference for voca-http library" />
      </Head>

      <ApiContainer>
        <SectionTitle>API Reference</SectionTitle>
        <Paragraph>
          This page provides a detailed reference for all the methods and interfaces in the voca-http library.
        </Paragraph>

        <SubsectionTitle>Core Methods</SubsectionTitle>
        
        <ApiMethodName>voca.create(fetch, config)</ApiMethodName>
        <MethodSignature>
          create(fetch: typeof globalThis.fetch, config?: VocaConfig): VocaInstance
        </MethodSignature>
        <Paragraph>
          Creates a configured instance of the HTTP client with custom behavior.
        </Paragraph>
        <Table>
          <thead>
            <tr>
              <Th>Parameter</Th>
              <Th>Type</Th>
              <Th>Description</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td><Code>fetch</Code></Td>
              <Td><Code>typeof globalThis.fetch</Code></Td>
              <Td>The fetch implementation to use (browser's fetch or a polyfill)</Td>
            </tr>
            <tr>
              <Td><Code>config</Code></Td>
              <Td><Code>VocaConfig</Code></Td>
              <Td>Optional configuration object with settings for the client</Td>
            </tr>
          </tbody>
        </Table>
        <Paragraph>
          Returns a function that can be used to make HTTP requests with the configured settings.
        </Paragraph>

        <ApiMethodName>voca.get(url, headers)</ApiMethodName>
        <MethodSignature>
          get(url: string, headers?: HeadersInit): Promise&lt;any&gt;
        </MethodSignature>
        <Paragraph>
          Makes a GET request to the specified URL.
        </Paragraph>
        <Table>
          <thead>
            <tr>
              <Th>Parameter</Th>
              <Th>Type</Th>
              <Th>Description</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td><Code>url</Code></Td>
              <Td><Code>string</Code></Td>
              <Td>The URL to request</Td>
            </tr>
            <tr>
              <Td><Code>headers</Code></Td>
              <Td><Code>HeadersInit</Code></Td>
              <Td>Optional HTTP headers for the request</Td>
            </tr>
          </tbody>
        </Table>

        <ApiMethodName>voca.post(url, data, headers)</ApiMethodName>
        <MethodSignature>
          post(url: string, data?: any, headers?: HeadersInit): Promise&lt;any&gt;
        </MethodSignature>
        <Paragraph>
          Makes a POST request to the specified URL with the provided data.
        </Paragraph>
        <Table>
          <thead>
            <tr>
              <Th>Parameter</Th>
              <Th>Type</Th>
              <Th>Description</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td><Code>url</Code></Td>
              <Td><Code>string</Code></Td>
              <Td>The URL to request</Td>
            </tr>
            <tr>
              <Td><Code>data</Code></Td>
              <Td><Code>any</Code></Td>
              <Td>Optional data to send in the request body</Td>
            </tr>
            <tr>
              <Td><Code>headers</Code></Td>
              <Td><Code>HeadersInit</Code></Td>
              <Td>Optional HTTP headers for the request</Td>
            </tr>
          </tbody>
        </Table>

        <ApiMethodName>voca.put(url, data, headers)</ApiMethodName>
        <MethodSignature>
          put(url: string, data?: any, headers?: HeadersInit): Promise&lt;any&gt;
        </MethodSignature>
        <Paragraph>
          Makes a PUT request to the specified URL with the provided data.
        </Paragraph>
        <Table>
          <thead>
            <tr>
              <Th>Parameter</Th>
              <Th>Type</Th>
              <Th>Description</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td><Code>url</Code></Td>
              <Td><Code>string</Code></Td>
              <Td>The URL to request</Td>
            </tr>
            <tr>
              <Td><Code>data</Code></Td>
              <Td><Code>any</Code></Td>
              <Td>Optional data to send in the request body</Td>
            </tr>
            <tr>
              <Td><Code>headers</Code></Td>
              <Td><Code>HeadersInit</Code></Td>
              <Td>Optional HTTP headers for the request</Td>
            </tr>
          </tbody>
        </Table>

        <ApiMethodName>voca.patch(url, data, headers)</ApiMethodName>
        <MethodSignature>
          patch(url: string, data?: any, headers?: HeadersInit): Promise&lt;any&gt;
        </MethodSignature>
        <Paragraph>
          Makes a PATCH request to the specified URL with the provided data.
        </Paragraph>
        <Table>
          <thead>
            <tr>
              <Th>Parameter</Th>
              <Th>Type</Th>
              <Th>Description</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td><Code>url</Code></Td>
              <Td><Code>string</Code></Td>
              <Td>The URL to request</Td>
            </tr>
            <tr>
              <Td><Code>data</Code></Td>
              <Td><Code>any</Code></Td>
              <Td>Optional data to send in the request body</Td>
            </tr>
            <tr>
              <Td><Code>headers</Code></Td>
              <Td><Code>HeadersInit</Code></Td>
              <Td>Optional HTTP headers for the request</Td>
            </tr>
          </tbody>
        </Table>

        <ApiMethodName>voca.delete(url, data, headers)</ApiMethodName>
        <MethodSignature>
          delete(url: string, data?: any, headers?: HeadersInit): Promise&lt;any&gt;
        </MethodSignature>
        <Paragraph>
          Makes a DELETE request to the specified URL.
        </Paragraph>
        <Table>
          <thead>
            <tr>
              <Th>Parameter</Th>
              <Th>Type</Th>
              <Th>Description</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td><Code>url</Code></Td>
              <Td><Code>string</Code></Td>
              <Td>The URL to request</Td>
            </tr>
            <tr>
              <Td><Code>data</Code></Td>
              <Td><Code>any</Code></Td>
              <Td>Optional data to send in the request body</Td>
            </tr>
            <tr>
              <Td><Code>headers</Code></Td>
              <Td><Code>HeadersInit</Code></Td>
              <Td>Optional HTTP headers for the request</Td>
            </tr>
          </tbody>
        </Table>

        <SubsectionTitle>File Handling</SubsectionTitle>

        <ApiMethodName>voca.uploadFile(url, file, headers, onProgress)</ApiMethodName>
        <MethodSignature>
          uploadFile(url: string, file: File, headers?: HeadersInit, onProgress?: (percent: number) =&gt; void): Promise&lt;any&gt;
        </MethodSignature>
        <Paragraph>
          Uploads a file to the specified URL with optional progress tracking.
        </Paragraph>
        <Table>
          <thead>
            <tr>
              <Th>Parameter</Th>
              <Th>Type</Th>
              <Th>Description</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td><Code>url</Code></Td>
              <Td><Code>string</Code></Td>
              <Td>The URL to upload the file to</Td>
            </tr>
            <tr>
              <Td><Code>file</Code></Td>
              <Td><Code>File</Code></Td>
              <Td>The file object to upload</Td>
            </tr>
            <tr>
              <Td><Code>headers</Code></Td>
              <Td><Code>HeadersInit</Code></Td>
              <Td>Optional HTTP headers for the request</Td>
            </tr>
            <tr>
              <Td><Code>onProgress</Code></Td>
              <Td><Code>(percent: number) =&gt; void</Code></Td>
              <Td>Optional callback function to track upload progress</Td>
            </tr>
          </tbody>
        </Table>

        <ApiMethodName>voca.downloadFile(url, headers, onProgress)</ApiMethodName>
        <MethodSignature>
          downloadFile(url: string, headers?: HeadersInit, onProgress?: (percent: number) =&gt; void): Promise&lt;string&gt;
        </MethodSignature>
        <Paragraph>
          Downloads a file from the specified URL with optional progress tracking.
        </Paragraph>
        <Table>
          <thead>
            <tr>
              <Th>Parameter</Th>
              <Th>Type</Th>
              <Th>Description</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td><Code>url</Code></Td>
              <Td><Code>string</Code></Td>
              <Td>The URL to download the file from</Td>
            </tr>
            <tr>
              <Td><Code>headers</Code></Td>
              <Td><Code>HeadersInit</Code></Td>
              <Td>Optional HTTP headers for the request</Td>
            </tr>
            <tr>
              <Td><Code>onProgress</Code></Td>
              <Td><Code>(percent: number) =&gt; void</Code></Td>
              <Td>Optional callback function to track download progress</Td>
            </tr>
          </tbody>
        </Table>

        <ApiMethodName>voca.trackProgress(progressEvent, onProgress)</ApiMethodName>
        <MethodSignature>
          trackProgress(progressEvent: ProgressEvent, onProgress: (percent: number) =&gt; void): void
        </MethodSignature>
        <Paragraph>
          Utility function to track progress from an upload or download event.
        </Paragraph>
        <Table>
          <thead>
            <tr>
              <Th>Parameter</Th>
              <Th>Type</Th>
              <Th>Description</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td><Code>progressEvent</Code></Td>
              <Td><Code>ProgressEvent</Code></Td>
              <Td>The progress event object</Td>
            </tr>
            <tr>
              <Td><Code>onProgress</Code></Td>
              <Td><Code>(percent: number) =&gt; void</Code></Td>
              <Td>Callback function to receive progress updates</Td>
            </tr>
          </tbody>
        </Table>

        <SubsectionTitle>Configuration</SubsectionTitle>

        <ApiMethodName>voca.config.addRequestInterceptor(interceptor)</ApiMethodName>
        <MethodSignature>
          addRequestInterceptor(interceptor: RequestInterceptor): void
        </MethodSignature>
        <Paragraph>
          Adds a request interceptor to modify requests before they are sent.
        </Paragraph>
        <Table>
          <thead>
            <tr>
              <Th>Parameter</Th>
              <Th>Type</Th>
              <Th>Description</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td><Code>interceptor</Code></Td>
              <Td><Code>RequestInterceptor</Code></Td>
              <Td>Function that receives and optionally modifies request options</Td>
            </tr>
          </tbody>
        </Table>

        <ApiMethodName>voca.config.addResponseInterceptor(interceptor)</ApiMethodName>
        <MethodSignature>
          addResponseInterceptor(interceptor: ResponseInterceptor): void
        </MethodSignature>
        <Paragraph>
          Adds a response interceptor to modify responses before they are returned.
        </Paragraph>
        <Table>
          <thead>
            <tr>
              <Th>Parameter</Th>
              <Th>Type</Th>
              <Th>Description</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td><Code>interceptor</Code></Td>
              <Td><Code>ResponseInterceptor</Code></Td>
              <Td>Function that receives and optionally modifies response objects</Td>
            </tr>
          </tbody>
        </Table>

        <ApiMethodName>voca.config.setTimeout(timeout)</ApiMethodName>
        <MethodSignature>
          setTimeout(timeout: number): void
        </MethodSignature>
        <Paragraph>
          Sets the default timeout for requests in milliseconds.
        </Paragraph>
        <Table>
          <thead>
            <tr>
              <Th>Parameter</Th>
              <Th>Type</Th>
              <Th>Description</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td><Code>timeout</Code></Td>
              <Td><Code>number</Code></Td>
              <Td>Timeout in milliseconds</Td>
            </tr>
          </tbody>
        </Table>

        <ApiMethodName>voca.config.setRetryCount(count)</ApiMethodName>
        <MethodSignature>
          setRetryCount(count: number): void
        </MethodSignature>
        <Paragraph>
          Sets the default number of retry attempts for failed requests.
        </Paragraph>
        <Table>
          <thead>
            <tr>
              <Th>Parameter</Th>
              <Th>Type</Th>
              <Th>Description</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td><Code>count</Code></Td>
              <Td><Code>number</Code></Td>
              <Td>Number of retry attempts</Td>
            </tr>
          </tbody>
        </Table>

        <SubsectionTitle>Interfaces</SubsectionTitle>

        <ApiMethodName>VocaConfig</ApiMethodName>
        <MethodSignature>
{`interface VocaConfig {
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
}`}
        </MethodSignature>
        <Paragraph>
          Configuration options for creating a voca-http instance.
        </Paragraph>

        <ApiMethodName>RequestOptions</ApiMethodName>
        <MethodSignature>
{`interface RequestOptions extends RequestInit {
  url: string;
  method: HttpMethod;
  body?: BodyInit | null;
  headers?: HeadersInit;
  signal?: AbortSignal;
}`}
        </MethodSignature>
        <Paragraph>
          Options for an HTTP request, extending the standard RequestInit interface.
        </Paragraph>
      </ApiContainer>
    </Layout>
  );
};

export default ApiPage; 