import React, { useState, useEffect, useRef } from 'react';
import { voca } from 'voca-http';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface User {
  id: number;
  name: string;
  email: string;
}

// Configure voca-http with interceptors and base URL
const api = voca.create(fetch, {
  baseUrl: 'https://jsonplaceholder.typicode.com',
  timeout: 8000,
  retryCount: 1,
  onResponse: async (response) => {
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    return response.json();
  }
});

// Request interceptor example - add authorization header
voca.config.addRequestInterceptor((options) => {
  options.headers = {
    ...options.headers,
    'Authorization': 'Bearer fake-token',
    'x-app-name': 'voca-http-demo'
  };
  return options;
});

// Response interceptor example - log responses
voca.config.addResponseInterceptor((response) => {
  console.log(`Response from ${response.url} with status ${response.status}`);
  return response;
});

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [newPost, setNewPost] = useState<{ title: string; body: string }>({
    title: '',
    body: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadResult, setUploadResult] = useState<string>('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Fetch posts when component mounts
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const data = await api('GET', '/posts');
      setPosts(data.slice(0, 5)); // Just get first 5 posts
      setError(null);
    } catch (err) {
      setError('Failed to fetch posts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await voca.get('/users');
      setUsers(data.slice(0, 5)); // Just get first 5 users
      setError(null);
    } catch (err) {
      setError('Failed to fetch users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const data = {
        ...newPost,
        userId: 1
      };
      
      const response = await voca.post('/posts', data);
      
      setPosts([response, ...posts]);
      setNewPost({ title: '', body: '' });
      setError(null);
    } catch (err) {
      setError('Failed to create post');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewPost(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file first');
      return;
    }

    setLoading(true);
    setUploadProgress(0);
    
    try {
      // Track upload progress
      const updateProgress = (percent: number) => {
        setUploadProgress(percent);
      };
      
      // In a real app, use your actual API endpoint
      const result = await voca.uploadFile(
        'https://httpbin.org/post',
        selectedFile,
        { 'X-Upload-Type': 'example' },
        updateProgress
      );
      
      setUploadResult(JSON.stringify(result, null, 2));
      setError(null);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setSelectedFile(null);
    } catch (err) {
      setError('Failed to upload file');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>voca-http React Example</h1>
      
      <div className="actions">
        <button onClick={fetchPosts} disabled={loading}>
          Fetch Posts
        </button>
        <button onClick={fetchUsers} disabled={loading}>
          Fetch Users
        </button>
      </div>
      
      {error && <div className="error">{error}</div>}
      
      {loading && <div className="loading">Loading...</div>}
      
      <div className="content">
        <div className="posts-section">
          <h2>Create New Post</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={newPost.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="body">Content:</label>
              <textarea
                id="body"
                name="body"
                value={newPost.body}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" disabled={loading}>
              Create Post
            </button>
          </form>
          
          <h2>Posts</h2>
          {posts.length > 0 ? (
            <ul className="posts-list">
              {posts.map((post) => (
                <li key={post.id} className="post-item">
                  <h3>{post.title}</h3>
                  <p>{post.body}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No posts found</p>
          )}
        </div>
        
        <div className="users-section">
          <h2>Users</h2>
          {users.length > 0 ? (
            <ul className="users-list">
              {users.map((user) => (
                <li key={user.id} className="user-item">
                  <h3>{user.name}</h3>
                  <p>{user.email}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No users found. Click "Fetch Users" to load.</p>
          )}
        </div>
        
        <div className="upload-section">
          <h2>File Upload</h2>
          <div className="form-group">
            <input
              type="file"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
            <button onClick={handleFileUpload} disabled={!selectedFile || loading}>
              Upload
            </button>
          </div>
          
          {uploadProgress > 0 && (
            <div className="progress-container">
              <div 
                className="progress-bar" 
                style={{ width: `${uploadProgress}%` }}
              >
                {Math.round(uploadProgress)}%
              </div>
            </div>
          )}
          
          {uploadResult && (
            <div className="upload-result">
              <h3>Upload Response:</h3>
              <pre>{uploadResult}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App; 