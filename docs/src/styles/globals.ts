import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --primary-color: #4CAF50;
    --secondary-color: #2196F3;
    --accent-color: #FF9800;
    --danger-color: #F44336;
    --success-color: #4CAF50;
    --warning-color: #FF9800;
    --dark-color: #333;
    --light-color: #f8f9fa;
    --grey-color: #6c757d;
    --border-color: #dee2e6;
    --hover-color: #e9ecef;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: var(--dark-color);
    background-color: var(--light-color);
  }

  a {
    color: var(--primary-color);
    text-decoration: none;
    transition: color 0.3s ease;
  }

  a:hover {
    color: #388E3C;
    text-decoration: underline;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 1rem;
    font-weight: 500;
    line-height: 1.2;
  }

  h1 {
    font-size: 2.5rem;
  }

  h2 {
    font-size: 2rem;
    margin-top: 2rem;
  }

  h3 {
    font-size: 1.75rem;
    margin-top: 1.5rem;
  }

  p {
    margin-bottom: 1rem;
    line-height: 1.6;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
    background-color: #f1f1f1;
    padding: 0.2em 0.4em;
    font-size: 85%;
    border-radius: 3px;
  }

  pre {
    overflow: auto;
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 5px;
    background-color: #f5f5f5;
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .btn {
    display: inline-block;
    background-color: var(--primary-color);
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    margin: 0.5rem 0;
    transition: background-color 0.3s ease;
  }

  .btn:hover {
    background-color: #388E3C;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
  }

  th, td {
    padding: 0.75rem;
    border-bottom: 1px solid var(--border-color);
    text-align: left;
  }

  th {
    background-color: var(--light-color);
  }
`;

export default GlobalStyles; 