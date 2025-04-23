import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Layout from '../src/components/Layout';
import CodeBlock from '../src/components/CodeBlock';
import Head from 'next/head';

const ExamplesContainer = styled.div`
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
`;

const Paragraph = styled.p`
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const CodeWrapper = styled.div`
  margin: 1.5rem 0;
`;

const InteractiveExample = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 2rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-left: 4px solid var(--primary-color);
`;

const ExampleTitle = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: var(--dark-color);
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const MethodBadge = styled.span<{ method: string }>`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  color: white;
  font-size: 0.8rem;
  font-weight: bold;
  background-color: ${({ method }) => {
    switch (method) {
      case 'GET': return '#2196F3';
      case 'POST': return '#4CAF50';
      case 'PUT': return '#FF9800';
      case 'PATCH': return '#9C27B0';
      case 'DELETE': return '#F44336';
      case 'FILE': return '#607D8B';
      default: return '#333';
    }
  }};
`;

const Button = styled.button`
  background-color: var(--primary-color);
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 0.9rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;

  &:hover {
    background-color: #5272e0;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ToggleButton = styled.button`
  background-color: transparent;
  border: 1px solid var(--primary-color);
  color: var(--primary-color);
  padding: 0.3rem 0.8rem;
  text-align: center;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  font-size: 0.8rem;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s;
  margin-left: auto;

  &:hover {
    background-color: var(--primary-color);
    color: white;
  }
`;

const ResultDisplay = styled.pre`
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 4px;
  overflow: auto;
  margin-top: 1rem;
  border-left: 4px solid var(--primary-color);
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.9rem;
  max-height: 300px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const CodeExampleContainer = styled.div`
  margin-top: 1.5rem;
  border-top: 1px solid #e0e0e0;
  padding-top: 1.5rem;
`;

const ProgressContainer = styled.div`
  width: 100%;
  background-color: #ddd;
  border-radius: 4px;
  margin: 10px 0;
  overflow: hidden;
`;

const ProgressBar = styled.div<{ progress: number }>`
  height: 20px;
  background-color: var(--primary-color);
  border-radius: 4px;
  width: ${props => `${props.progress}%`};
  transition: width 0.3s;
`;

const InputField = styled.input`
  margin: 10px 0;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
`;

const ImagePreview = styled.img`
  max-width: 100%;
  margin-top: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Examples: React.FC = () => {
  const [getResult, setGetResult] = useState<string>("Click a button to make a GET request");
  const [postResult, setPostResult] = useState<string>("Click the button to create a new post");
  const [putResult, setPutResult] = useState<string>("Click the button to update a post with PUT");
  const [patchResult, setPatchResult] = useState<string>("Click the button to update a post with PATCH");
  const [deleteResult, setDeleteResult] = useState<string>("Click the button to delete a post");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadResult, setUploadResult] = useState<string>("Select a file and click upload");
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [downloadResult, setDownloadResult] = useState<string>("Enter a URL and click download");
  const [downloadImageUrl, setDownloadImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const downloadUrlRef = useRef<HTMLInputElement>(null);
  
  // State for toggling code examples
  const [showGetCode, setShowGetCode] = useState<boolean>(false);
  const [showPostCode, setShowPostCode] = useState<boolean>(false);
  const [showPutCode, setShowPutCode] = useState<boolean>(false);
  const [showPatchCode, setShowPatchCode] = useState<boolean>(false);
  const [showDeleteCode, setShowDeleteCode] = useState<boolean>(false);
  const [showFileUploadCode, setShowFileUploadCode] = useState<boolean>(false);
  const [showFileDownloadCode, setShowFileDownloadCode] = useState<boolean>(false);
  const [showInterceptorsCode, setShowInterceptorsCode] = useState<boolean>(false);
  const [showConfiguredInstanceCode, setShowConfiguredInstanceCode] = useState<boolean>(false);
  
  const basicExample = `import { voca } from 'voca-http';

// 1. Basic GET request
const posts = await voca.get('https://jsonplaceholder.typicode.com/posts');
console.log('Posts:', posts);

// 2. GET request with query parameters
const userPosts = await voca.get('https://jsonplaceholder.typicode.com/posts?userId=1');
console.log('User posts:', userPosts);`;

  const postExample = `// POST request to create a resource
const newPost = await voca.post('https://jsonplaceholder.typicode.com/posts', {
  title: 'voca-http example',
  body: 'This is a test post created with voca-http',
  userId: 1
});

console.log('Created post:', newPost);`;

  const putPatchExample = `// PUT request to update a resource (completely replace)
const updatedPost = await voca.put('https://jsonplaceholder.typicode.com/posts/1', {
  id: 1,
  title: 'Updated title',
  body: 'This post has been completely replaced with PUT',
  userId: 1
});
console.log('Updated post with PUT:', updatedPost);

// PATCH request to update a resource (partial update)
const patchedPost = await voca.patch('https://jsonplaceholder.typicode.com/posts/1', {
  title: 'Updated title with PATCH'
});
console.log('Updated post with PATCH:', patchedPost);`;

  const deleteExample = `// DELETE request to remove a resource
const deleteResult = await voca.delete('https://jsonplaceholder.typicode.com/posts/1');
console.log('Delete result:', deleteResult);`;

  const configuredInstanceExample = `// Create a configured instance with base URL and interceptors
const api = voca.create(fetch, {
  baseUrl: 'https://jsonplaceholder.typicode.com',
  timeout: 5000,
  retryCount: 2,
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

// Now you can make requests with shorter paths
const posts = await api.get('/posts');
const post = await api.get('/posts/1');
const comments = await api.get('/posts/1/comments');`;

  const fileUploadExample = `// In React:
import { voca } from 'voca-http';
import { useState, useRef } from 'react';

function FileUploadExample() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadResult, setUploadResult] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  
  const handleUpload = async () => {
    const file = fileInputRef.current.files[0];
    if (!file) {
      setError('Please select a file first');
      return;
    }
    
    try {
      setUploadProgress(0);
      setError(null);
      
      // Track upload progress
      const updateProgress = (percent) => {
        setUploadProgress(percent);
      };
      
      const result = await voca.uploadFile(
        'https://httpbin.org/post',
        file,
        { 'Authorization': 'Bearer example-token' },
        updateProgress
      );
      
      setUploadResult(result);
    } catch (err) {
      setError(err.message || 'Upload failed');
      console.error(err);
    }
  };
  
  return (
    <div>
      <input type="file" ref={fileInputRef} />
      <button onClick={handleUpload}>Upload</button>
      
      {uploadProgress > 0 && (
        <div className="progress-bar" style={{width: \`\${uploadProgress}%\`}}>
          {uploadProgress.toFixed(0)}%
        </div>
      )}
      
      {error && <div className="error">{error}</div>}
      
      {uploadResult && (
        <pre>{JSON.stringify(uploadResult, null, 2)}</pre>
      )}
    </div>
  );
}`;

  const fileDownloadExample = `// File download with progress tracking
import { voca } from 'voca-http';
import { useState } from 'react';

function FileDownloadExample() {
  const [downloadUrl, setDownloadUrl] = useState('https://picsum.photos/200');
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [imageData, setImageData] = useState(null);
  const [error, setError] = useState(null);
  
  const handleDownload = async () => {
    if (!downloadUrl) {
      setError('Please enter a URL to download');
      return;
    }
    
    try {
      setDownloadProgress(0);
      setError(null);
      setImageData(null);
      
      // Track download progress
      const updateProgress = (percent) => {
        setDownloadProgress(percent);
      };
      
      const data = await voca.downloadFile(
        downloadUrl,
        {}, // Optional headers
        updateProgress
      );
      
      // For images, create a blob and object URL
      if (downloadUrl.match(/\\.(jpeg|jpg|gif|png)$/) || downloadUrl.includes('picsum.photos')) {
        const blob = new Blob([data], { type: 'image/jpeg' });
        const imageUrl = URL.createObjectURL(blob);
        setImageData(imageUrl);
      } else {
        setImageData(null);
      }
      
      console.log('Download complete, data size:', data.length);
    } catch (err) {
      setError(err.message || 'Download failed');
      console.error(err);
    }
  };
  
  return (
    <div>
      <input 
        type="text" 
        value={downloadUrl}
        onChange={(e) => setDownloadUrl(e.target.value)}
        placeholder="Enter URL to download"
      />
      <button onClick={handleDownload}>Download</button>
      
      {downloadProgress > 0 && (
        <div className="progress-container">
          <div 
            className="progress-bar" 
            style={{width: \`\${downloadProgress}%\`}}
          >
            {downloadProgress.toFixed(0)}%
          </div>
        </div>
      )}
      
      {error && <div className="error">{error}</div>}
      
      {imageData && (
        <div>
          <img src={imageData} alt="Downloaded image" />
        </div>
      )}
    </div>
  );
}`;

  const interceptorsExample = `// Request interceptor for adding authentication
voca.config.addRequestInterceptor((options) => {
  // Add auth token to all requests
  options.headers = {
    ...options.headers,
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  };
  return options;
});

// Response interceptor for handling common response patterns
voca.config.addResponseInterceptor((response) => {
  // Log all responses
  console.log(\`Response from \${response.url}: \${response.status}\`);
  
  // Check for token expiration
  if (response.status === 401) {
    // Redirect to login
    window.location.href = '/login';
  }
  
  return response;
});`;

  const errorHandlingExample = `try {
  const data = await api.get('/nonexistent-endpoint');
  // Process data
} catch (error) {
  if (error.message.includes('404')) {
    console.error('Resource not found');
  } else if (error.message.includes('401')) {
    console.error('Authentication required');
  } else if (error.message.includes('403')) {
    console.error('Permission denied');
  } else {
    console.error('Request failed:', error.message);
  }
}`;

  const handleFetchPosts = async () => {
    setGetResult("Loading...");
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      setGetResult(JSON.stringify(data.slice(0, 3), null, 2));
    } catch (error: any) {
      setGetResult(`Error: ${error.message || 'Unknown error'}`);
    }
  };

  const handleFetchPost = async () => {
    setGetResult("Loading...");
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
      const data = await response.json();
      setGetResult(JSON.stringify(data, null, 2));
    } catch (error: any) {
      setGetResult(`Error: ${error.message || 'Unknown error'}`);
    }
  };

  const handleFetchComments = async () => {
    setGetResult("Loading...");
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1/comments');
      const data = await response.json();
      setGetResult(JSON.stringify(data.slice(0, 2), null, 2));
    } catch (error: any) {
      setGetResult(`Error: ${error.message || 'Unknown error'}`);
    }
  };

  const handleCreatePost = async () => {
    setPostResult("Loading...");
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: 'voca-http example',
          body: 'This is a test post created with voca-http',
          userId: 1
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const data = await response.json();
      setPostResult(JSON.stringify(data, null, 2));
    } catch (error: any) {
      setPostResult(`Error: ${error.message || 'Unknown error'}`);
    }
  };

  const handleUpdatePut = async () => {
    setPutResult("Loading...");
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'PUT',
        body: JSON.stringify({
          id: 1,
          title: 'Updated with PUT',
          body: 'This post has been completely replaced with PUT',
          userId: 1
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const data = await response.json();
      setPutResult(JSON.stringify(data, null, 2));
    } catch (error: any) {
      setPutResult(`Error: ${error.message || 'Unknown error'}`);
    }
  };

  const handleUpdatePatch = async () => {
    setPatchResult("Loading...");
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'PATCH',
        body: JSON.stringify({
          title: 'Updated with PATCH'
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const data = await response.json();
      setPatchResult(JSON.stringify(data, null, 2));
    } catch (error: any) {
      setPatchResult(`Error: ${error.message || 'Unknown error'}`);
    }
  };

  const handleDeletePost = async () => {
    setDeleteResult("Loading...");
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'DELETE',
      });
      const text = await response.text();
      setDeleteResult(`Post successfully deleted. Server response: ${text || '{}'}`);
    } catch (error: any) {
      setDeleteResult(`Error: ${error.message || 'Unknown error'}`);
    }
  };

  const handleFileUpload = () => {
    setUploadProgress(0);
    setUploadResult("Select a file and click upload");
    
    if (!fileInputRef.current?.files?.length) {
      setUploadResult("Please select a file first");
      return;
    }
    
    const file = fileInputRef.current.files[0];
    
    // Simulate file upload with progress
    setUploadResult(`Uploading ${file.name}...`);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setUploadResult(JSON.stringify({
          success: true,
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
          message: "File uploaded successfully (simulated)"
        }, null, 2));
      }
    }, 200);
  };
  
  const handleFileDownload = () => {
    setDownloadProgress(0);
    setDownloadResult("Downloading...");
    setDownloadImageUrl(null);
    
    const url = downloadUrlRef.current?.value || "https://picsum.photos/200";
    
    // Simulate file download with progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setDownloadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        
        if (url.match(/\.(jpeg|jpg|gif|png)$/) || url.includes('picsum.photos')) {
          setDownloadImageUrl(url);
          setDownloadResult("Image downloaded successfully (simulated)");
        } else {
          setDownloadResult("File downloaded successfully (simulated)");
        }
      }
    }, 200);
  };

  return (
    <Layout>
      <Head>
        <title>Examples | voca-http</title>
        <meta name="description" content="Examples and usage patterns for voca-http library" />
      </Head>

      <ExamplesContainer>
        <SectionTitle>Examples</SectionTitle>
        <Paragraph>
          This page provides practical examples of how to use voca-http in different scenarios.
          You can try out the interactive examples below to see voca-http in action.
        </Paragraph>

        <SectionTitle>Interactive Examples</SectionTitle>
        
        <InteractiveExample>
          <ExampleTitle>
            <MethodBadge method="GET">GET</MethodBadge>
            Request Examples
            <ToggleButton onClick={() => setShowGetCode(!showGetCode)}>
              {showGetCode ? 'Hide Code' : 'Show Code'}
            </ToggleButton>
          </ExampleTitle>
          <ButtonGroup>
            <Button onClick={handleFetchPosts}>Fetch Posts</Button>
            <Button onClick={handleFetchPost}>Fetch Single Post</Button>
            <Button onClick={handleFetchComments}>Fetch Comments</Button>
          </ButtonGroup>
          <ResultDisplay>{getResult}</ResultDisplay>
          {showGetCode && (
            <CodeExampleContainer>
              <CodeBlock code={basicExample} language="javascript" />
            </CodeExampleContainer>
          )}
        </InteractiveExample>

        <InteractiveExample>
          <ExampleTitle>
            <MethodBadge method="POST">POST</MethodBadge>
            Request Example
            <ToggleButton onClick={() => setShowPostCode(!showPostCode)}>
              {showPostCode ? 'Hide Code' : 'Show Code'}
            </ToggleButton>
          </ExampleTitle>
          <Button onClick={handleCreatePost}>Create New Post</Button>
          <ResultDisplay>{postResult}</ResultDisplay>
          {showPostCode && (
            <CodeExampleContainer>
              <CodeBlock code={postExample} language="javascript" />
            </CodeExampleContainer>
          )}
        </InteractiveExample>

        <InteractiveExample>
          <ExampleTitle>
            <MethodBadge method="PUT">PUT</MethodBadge>
            Request Example
            <ToggleButton onClick={() => setShowPutCode(!showPutCode)}>
              {showPutCode ? 'Hide Code' : 'Show Code'}
            </ToggleButton>
          </ExampleTitle>
          <Button onClick={handleUpdatePut}>Update Post (Replace)</Button>
          <ResultDisplay>{putResult}</ResultDisplay>
          {showPutCode && (
            <CodeExampleContainer>
              <CodeBlock code={putPatchExample} language="javascript" />
            </CodeExampleContainer>
          )}
        </InteractiveExample>

        <InteractiveExample>
          <ExampleTitle>
            <MethodBadge method="PATCH">PATCH</MethodBadge>
            Request Example
            <ToggleButton onClick={() => setShowPatchCode(!showPatchCode)}>
              {showPatchCode ? 'Hide Code' : 'Show Code'}
            </ToggleButton>
          </ExampleTitle>
          <Button onClick={handleUpdatePatch}>Update Post (Partial)</Button>
          <ResultDisplay>{patchResult}</ResultDisplay>
          {showPatchCode && (
            <CodeExampleContainer>
              <CodeBlock code={putPatchExample} language="javascript" />
            </CodeExampleContainer>
          )}
        </InteractiveExample>

        <InteractiveExample>
          <ExampleTitle>
            <MethodBadge method="DELETE">DELETE</MethodBadge>
            Request Example
            <ToggleButton onClick={() => setShowDeleteCode(!showDeleteCode)}>
              {showDeleteCode ? 'Hide Code' : 'Show Code'}
            </ToggleButton>
          </ExampleTitle>
          <Button onClick={handleDeletePost}>Delete Post</Button>
          <ResultDisplay>{deleteResult}</ResultDisplay>
          {showDeleteCode && (
            <CodeExampleContainer>
              <CodeBlock code={deleteExample} language="javascript" />
            </CodeExampleContainer>
          )}
        </InteractiveExample>
        
        <InteractiveExample>
          <ExampleTitle>
            <MethodBadge method="FILE">FILE</MethodBadge>
            Upload Example
            <ToggleButton onClick={() => setShowFileUploadCode(!showFileUploadCode)}>
              {showFileUploadCode ? 'Hide Code' : 'Show Code'}
            </ToggleButton>
          </ExampleTitle>
          <InputField type="file" ref={fileInputRef} />
          <Button onClick={handleFileUpload}>Upload File</Button>
          <ProgressContainer>
            <ProgressBar progress={uploadProgress} />
          </ProgressContainer>
          <ResultDisplay>{uploadResult}</ResultDisplay>
          {showFileUploadCode && (
            <CodeExampleContainer>
              <CodeBlock code={fileUploadExample} language="javascript" />
            </CodeExampleContainer>
          )}
        </InteractiveExample>
        
        <InteractiveExample>
          <ExampleTitle>
            <MethodBadge method="FILE">FILE</MethodBadge>
            Download Example
            <ToggleButton onClick={() => setShowFileDownloadCode(!showFileDownloadCode)}>
              {showFileDownloadCode ? 'Hide Code' : 'Show Code'}
            </ToggleButton>
          </ExampleTitle>
          <InputField 
            type="text" 
            ref={downloadUrlRef}
            defaultValue="https://picsum.photos/200" 
            placeholder="Enter URL to download" 
          />
          <Button onClick={handleFileDownload}>Download File</Button>
          <ProgressContainer>
            <ProgressBar progress={downloadProgress} />
          </ProgressContainer>
          <ResultDisplay>{downloadResult}</ResultDisplay>
          {downloadImageUrl && (
            <ImagePreview src={downloadImageUrl} alt="Downloaded" />
          )}
          {showFileDownloadCode && (
            <CodeExampleContainer>
              <CodeBlock code={fileDownloadExample} language="javascript" />
            </CodeExampleContainer>
          )}
        </InteractiveExample>
        
        <SectionTitle>Advanced Examples</SectionTitle>
        
        <InteractiveExample>
          <ExampleTitle>
            Interceptors and Error Handling
            <ToggleButton onClick={() => setShowInterceptorsCode(!showInterceptorsCode)}>
              {showInterceptorsCode ? 'Hide Code' : 'Show Code'}
            </ToggleButton>
          </ExampleTitle>
          <Paragraph>
            Interceptors allow you to intercept and modify requests before they are sent
            and responses before they are processed.
          </Paragraph>
          {showInterceptorsCode && (
            <CodeExampleContainer>
              <SubsectionTitle>Using Interceptors</SubsectionTitle>
              <CodeBlock code={interceptorsExample} language="javascript" />
              
              <SubsectionTitle>Error Handling</SubsectionTitle>
              <CodeBlock code={errorHandlingExample} language="javascript" />
            </CodeExampleContainer>
          )}
        </InteractiveExample>
        
        <InteractiveExample>
          <ExampleTitle>
            Configured Instance
            <ToggleButton onClick={() => setShowConfiguredInstanceCode(!showConfiguredInstanceCode)}>
              {showConfiguredInstanceCode ? 'Hide Code' : 'Show Code'}
            </ToggleButton>
          </ExampleTitle>
          <Paragraph>
            Create a configured instance with a base URL, default headers, and other options.
          </Paragraph>
          {showConfiguredInstanceCode && (
            <CodeExampleContainer>
              <CodeBlock code={configuredInstanceExample} language="javascript" />
            </CodeExampleContainer>
          )}
        </InteractiveExample>
      </ExamplesContainer>
    </Layout>
  );
};

export default Examples; 