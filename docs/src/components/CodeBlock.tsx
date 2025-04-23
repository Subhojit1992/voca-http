import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import styled from 'styled-components';

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
}

const StyledWrapper = styled.div`
  position: relative;
  margin: 1.5rem 0;
`;

const CopyButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: rgba(0, 0, 0, 0.3);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.3rem 0.6rem;
  font-size: 0.8rem;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s;

  ${StyledWrapper}:hover & {
    opacity: 1;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.5);
  }
`;

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'javascript',
  showLineNumbers = true,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <StyledWrapper>
      <CopyButton onClick={handleCopy}>
        {copied ? 'Copied!' : 'Copy'}
      </CopyButton>
      <SyntaxHighlighter
        language={language}
        style={tomorrow}
        showLineNumbers={showLineNumbers}
        wrapLines
      >
        {code}
      </SyntaxHighlighter>
    </StyledWrapper>
  );
};

export default CodeBlock; 