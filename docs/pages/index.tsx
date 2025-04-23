import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Layout from '../src/components/Layout';
import FeatureCard from '../src/components/FeatureCard';
import CodeBlock from '../src/components/CodeBlock';
import Head from 'next/head';

const HeroSection = styled.section`
  text-align: center;
  padding: 3rem 0;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: var(--dark-color);
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  color: var(--grey-color);
  margin-bottom: 2rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const CTAButton = styled.a`
  display: inline-block;
  background-color: var(--primary-color);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1.1rem;
  margin: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s;
  text-decoration: none;

  &:hover {
    background-color: #388E3C;
    text-decoration: none;
    color: white;
  }
`;

const SecondaryButton = styled(CTAButton)`
  background-color: white;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);

  &:hover {
    background-color: #f5f5f5;
    color: var(--primary-color);
  }
`;

const Section = styled.section`
  padding: 3rem 0;
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const CodeExample = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin: 2rem 0;
`;

const CodeTitle = styled.h3`
  margin-bottom: 1rem;
`;

const Home: React.FC = () => {
  const basicExample = `// Create a configured instance
const api = voca.create(fetch, {
  baseUrl: 'https://api.example.com',
  timeout: 10000,
  onResponse: async (response) => {
    if (!response.ok) {
      throw new Error(\`HTTP Error: \${response.status}\`);
    }
    return response.json();
  }
});

// Make requests with your configured API
const posts = await api.get('/posts');
const newPost = await api.post('/posts', { title: 'New Post', body: 'Content' });`;

  const uploadExample = `// Upload a file with progress tracking
const updateProgress = (percent) => {
  console.log(\`Upload progress: \${percent.toFixed(1)}%\`);
  progressBar.style.width = \`\${percent}%\`;
};

const result = await api.uploadFile(
  'https://api.example.com/upload',
  fileObject,
  { 'Authorization': 'Bearer token' },
  updateProgress
);`;

  return (
    <Layout>
      <Head>
        <title>voca-http - Modern HTTP client for web applications</title>
        <meta name="description" content="A lightweight, flexible HTTP client for modern web applications." />
      </Head>

      <HeroSection>
        <img src="/images/voca-logo.png" alt="voca-http logo" width={130} height={130} />
        <Title>Voca HTTP</Title>
        <Subtitle>
          A lightweight, flexible HTTP client for modern web applications, with support for interceptors, timeouts, retries, and file handling.
        </Subtitle>
        <div>
          <Link href="/docs" passHref>
            <CTAButton>Get Started</CTAButton>
          </Link>
          <Link href="/examples" passHref>
            <SecondaryButton>View Examples</SecondaryButton>
          </Link>
        </div>
      </HeroSection>

      <Section>
        <SectionTitle>Features</SectionTitle>
        <Grid>
          <FeatureCard
            title="Simple & Intuitive"
            description="Easy-to-use API that wraps the native fetch API with powerful features."
            icon={<span>🚀</span>}
          />
          <FeatureCard
            title="Request Interceptors"
            description="Modify requests before they are sent, perfect for adding authentication headers."
            icon={<span>⚙️</span>}
          />
          <FeatureCard
            title="Response Interceptors"
            description="Transform responses before they reach your code, simplifying error handling."
            icon={<span>🔄</span>}
          />
          <FeatureCard
            title="Automatic Retries"
            description="Configurable retry behavior for failed requests with exponential backoff."
            icon={<span>🔁</span>}
          />
          <FeatureCard
            title="File Handling"
            description="Built-in support for file uploads and downloads with progress tracking."
            icon={<span>📁</span>}
          />
          <FeatureCard
            title="TypeScript Support"
            description="Full TypeScript support with comprehensive type definitions."
            icon={<span>📘</span>}
          />
        </Grid>
      </Section>

      <Section>
        <SectionTitle>Quick Start</SectionTitle>
        <CodeExample>
          <CodeTitle>Basic Usage</CodeTitle>
          <CodeBlock
            code={basicExample}
            language="javascript"
          />
        </CodeExample>

        <CodeExample>
          <CodeTitle>File Upload with Progress</CodeTitle>
          <CodeBlock
            code={uploadExample}
            language="javascript"
          />
        </CodeExample>
      </Section>
    </Layout>
  );
};

export default Home; 