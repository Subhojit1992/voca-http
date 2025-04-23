import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import GlobalStyles from '../styles/globals';

const Main = styled.main`
  min-height: calc(100vh - 120px);
`;

const Footer = styled.footer`
  background-color: var(--dark-color);
  color: white;
  padding: 2rem;
  text-align: center;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const AdBanner = styled.div`
  background-color: #2563eb; /* Bright blue background */
  color: white;
  padding: 0.75rem 0;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 10;
`;

const AdContainer = styled(Container)`
  padding: 0.5rem 1rem;
`;

const AdLink = styled.a`
  color: white;
  font-weight: 600;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 1.1rem;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    font-size: 0.95rem;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 5px;
  }

  &:hover {
    color: #f0f4ff;
    transform: scale(1.02);
    text-decoration: none;
  }
`;

const EmojiSpan = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    margin-right: 4px;
  }
`;

const HighlightSpan = styled.span`
  background-color: rgba(255, 255, 255, 0.2);
  padding: 0.1rem 0.5rem;
  border-radius: 4px;
  margin-left: 8px;
  transition: background-color 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 2px;
    padding: 0.1rem 0.4rem;
    font-size: 0.85rem;
  }

  ${AdLink}:hover & {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <GlobalStyles />
      <Navbar />
      <AdBanner>
        <AdContainer>
          <AdLink href="https://userdnajs.netlify.app/" target="_blank" rel="noopener noreferrer">
            <EmojiSpan>🧬</EmojiSpan> Try UserDNAjs <HighlightSpan>Easy Fingerprinting Library</HighlightSpan>
          </AdLink>
        </AdContainer>
      </AdBanner>
      <Main>
        <Container>{children}</Container>
      </Main>
      <Footer>
        <Container>
          <p>&copy; {new Date().getFullYear()} voca-http. All rights reserved.</p>
          <p>
            A lightweight, flexible HTTP client for modern web applications.
          </p>
        </Container>
      </Footer>
    </>
  );
};

export default Layout; 