import React from 'react';
import styled from 'styled-components';
import Layout from '../src/components/Layout';
import CodeBlock from '../src/components/CodeBlock';
import Head from 'next/head';

const DocsContainer = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 3fr;
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 2fr;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const Sidebar = styled.div`
  position: sticky;
  top: 2rem;
  height: fit-content;
  padding: 1.5rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-left: 4px solid var(--primary-color);
  min-width: 280px;

  @media (max-width: 1024px) {
    min-width: 240px;
  }

  @media (max-width: 768px) {
    position: relative;
    top: 0;
    min-width: auto;
    margin-bottom: 1rem;
  }
`;

const Content = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow-x: auto;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const NavItem = styled.a`
  display: block;
  padding: 0.5rem 0;
  margin-bottom: 0.3rem;
  color: var(--dark-color);
  border-left: 3px solid transparent;
  padding-left: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.95rem;

  &:hover {
    color: var(--primary-color);
    border-left-color: var(--primary-color);
    background-color: rgba(108, 137, 237, 0.05);
    text-decoration: none;
  }

  &.active {
    color: var(--primary-color);
    border-left-color: var(--primary-color);
    font-weight: 600;
    background-color: rgba(108, 137, 237, 0.1);
  }
`;

const NavCategory = styled.h3`
  font-size: 1.1rem;
  margin-top: 1.5rem;
  margin-bottom: 0.8rem;
  color: var(--dark-color);
  font-weight: 600;
  padding-bottom: 0.3rem;
  border-bottom: 1px solid #eee;

  &:first-child {
    margin-top: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--primary-color);

  &:first-child {
    margin-top: 0;
  }
`;

const SubsectionTitle = styled.h3`
  font-size: 1.5rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
`;

const Paragraph = styled.p`
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const CodeWrapper = styled.div`
  margin: 1.5rem 0;
`;

const ApiMenu = styled.div`
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
`;

const ApiLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--primary-color);
  color: white;
  padding: 0.6rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s ease;
  font-weight: 500;
  font-size: 0.9rem;
  justify-content: center;
  margin-top: 0.5rem;

  &:hover {
    background-color: #5272e0;
    text-decoration: none;
    color: white;
  }
`;

const Documentation: React.FC = () => {
  const installCode = `npm install voca-http`;

  const basicUsageCode = `import { voca } from 'voca-http';

// Basic usage with global fetch
const posts = await voca.get('https://jsonplaceholder.typicode.com/posts');
const post = await voca.post('https://jsonplaceholder.typicode.com/posts', { 
  title: 'foo', 
  body: 'bar', 
  userId: 1 
});`;

  const configuredInstanceCode = `// Create a configured instance
const api = voca.create(fetch, {
  baseUrl: 'https://api.example.com',
  timeout: 5000,
  retryCount: 3,
  onResponse: async (response) => {
    if (!response.ok) {
      throw new Error(\`HTTP Error: \${response.status}\`);
    }
    return response.json();
  },
  onError: (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
});

// Use the configured instance
const users = await api.get('/users');
const newUser = await api.post('/users', { name: 'John Doe', email: 'john@example.com' });`;

  const interceptorsCode = `// Add a request interceptor for authentication
voca.config.addRequestInterceptor((options) => {
  options.headers = {
    ...options.headers,
    'Authorization': 'Bearer your-token-here'
  };
  return options;
});

// Add a response interceptor for logging
voca.config.addResponseInterceptor((response) => {
  console.log(\`Response from \${response.url}: \${response.status}\`);
  return response;
});`;

  const fileUploadCode = `// Upload a file with progress tracking
const updateProgress = (percent) => {
  console.log(\`Upload progress: \${percent.toFixed(1)}%\`);
  progressBar.style.width = \`\${percent}%\`;
};

const result = await voca.uploadFile(
  'https://example.com/upload', 
  fileObject,
  { 'Authorization': 'Bearer your-token' },
  updateProgress
);`;

  const fileDownloadCode = `// Download a file with progress tracking
const updateProgress = (percent) => {
  console.log(\`Download progress: \${percent.toFixed(1)}%\`);
  progressBar.style.width = \`\${percent}%\`;
};

const fileData = await voca.downloadFile(
  'https://example.com/files/document.pdf',
  { 'Authorization': 'Bearer your-token' },
  updateProgress
);`;

  return (
    <Layout>
      <Head>
        <title>Documentation | voca-http</title>
        <meta name="description" content="Documentation for voca-http library" />
      </Head>

      <DocsContainer>
        <Sidebar>
          <NavCategory>Getting Started</NavCategory>
          <NavItem href="#installation" className="active">Installation</NavItem>
          <NavItem href="#basic-usage">Basic Usage</NavItem>

          <NavCategory>Core Concepts</NavCategory>
          <NavItem href="#configuration">Configuration</NavItem>
          <NavItem href="#interceptors">Interceptors</NavItem>
          <NavItem href="#error-handling">Error Handling</NavItem>

          <NavCategory>Features</NavCategory>
          <NavItem href="#file-upload">File Upload</NavItem>
          <NavItem href="#file-download">File Download</NavItem>
          <NavItem href="#timeout-retry">Timeout & Retry</NavItem>
          
          <ApiMenu>
            <NavCategory>API Reference</NavCategory>
            <ApiLink href="/api-reference">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8l3.147-3.146zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8l-3.147-3.146z"/>
              </svg>
              Full API Reference
            </ApiLink>
          </ApiMenu>
        </Sidebar>

        <Content>
          <SectionTitle id="installation">Installation</SectionTitle>
          <Paragraph>
            Install voca-http using npm:
          </Paragraph>
          <CodeWrapper>
            <CodeBlock code={installCode} language="bash" showLineNumbers={false} />
          </CodeWrapper>

          <SectionTitle id="basic-usage">Basic Usage</SectionTitle>
          <Paragraph>
            voca-http provides a simple and intuitive API for making HTTP requests. 
            You can use it directly with the global methods:
          </Paragraph>
          <CodeWrapper>
            <CodeBlock code={basicUsageCode} language="javascript" />
          </CodeWrapper>

          <SectionTitle id="configuration">Configuration</SectionTitle>
          <Paragraph>
            For more advanced usage, create a configured instance with custom settings:
          </Paragraph>
          <CodeWrapper>
            <CodeBlock code={configuredInstanceCode} language="javascript" />
          </CodeWrapper>
          <Paragraph>
            The configuration object supports the following options:
          </Paragraph>
          <ul>
            <li><strong>baseUrl</strong> - Base URL for all requests</li>
            <li><strong>timeout</strong> - Request timeout in milliseconds</li>
            <li><strong>retryCount</strong> - Number of retry attempts for failed requests</li>
            <li><strong>onRequest</strong> - Function to modify request options</li>
            <li><strong>onResponse</strong> - Function to process successful responses</li>
            <li><strong>onError</strong> - Function to handle request errors</li>
            <li><strong>interceptors</strong> - Request and response interceptors</li>
          </ul>

          <SectionTitle id="interceptors">Interceptors</SectionTitle>
          <Paragraph>
            Interceptors allow you to modify requests before they are sent and responses before they are returned:
          </Paragraph>
          <CodeWrapper>
            <CodeBlock code={interceptorsCode} language="javascript" />
          </CodeWrapper>

          <SectionTitle id="error-handling">Error Handling</SectionTitle>
          <Paragraph>
            voca-http provides several ways to handle errors:
          </Paragraph>
          <SubsectionTitle>Using try/catch</SubsectionTitle>
          <CodeWrapper>
            <CodeBlock code={`try {
  const data = await api.get('/some-endpoint');
} catch (error) {
  console.error('Request failed:', error.message);
}`} language="javascript" />
          </CodeWrapper>

          <SubsectionTitle>Using onError handler</SubsectionTitle>
          <Paragraph>
            The <code>onError</code> handler in the configuration object is called for any request error:
          </Paragraph>
          <CodeWrapper>
            <CodeBlock code={`const api = voca.create(fetch, {
  onError: (error) => {
    // Log the error
    console.error('API Error:', error);
    
    // You can transform the error or return a default value
    return Promise.reject(error);
  }
});`} language="javascript" />
          </CodeWrapper>

          <SectionTitle id="file-upload">File Upload</SectionTitle>
          <Paragraph>
            voca-http provides built-in support for file uploads with progress tracking:
          </Paragraph>
          <CodeWrapper>
            <CodeBlock code={fileUploadCode} language="javascript" />
          </CodeWrapper>

          <SectionTitle id="file-download">File Download</SectionTitle>
          <Paragraph>
            You can also download files with progress tracking:
          </Paragraph>
          <CodeWrapper>
            <CodeBlock code={fileDownloadCode} language="javascript" />
          </CodeWrapper>

          <SectionTitle id="timeout-retry">Timeout & Retry</SectionTitle>
          <Paragraph>
            voca-http automatically handles request timeouts and retries:
          </Paragraph>
          <CodeWrapper>
            <CodeBlock code={`const api = voca.create(fetch, {
  timeout: 5000,  // 5 seconds timeout
  retryCount: 3   // Retry failed requests up to 3 times
});`} language="javascript" />
          </CodeWrapper>
          <Paragraph>
            Requests that fail due to network issues or server errors will be automatically retried 
            based on the configured <code>retryCount</code>. Requests that exceed the timeout will be aborted.
          </Paragraph>
        </Content>
      </DocsContainer>
    </Layout>
  );
};

export default Documentation; 