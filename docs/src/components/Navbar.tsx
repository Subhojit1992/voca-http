import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Image from 'next/image';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid var(--border-color);
  padding: 0.5rem 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary-color);
  position: relative;
  top: -3px;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    display: ${({ isOpen }: { isOpen: boolean }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 45px;
    left: 0;
    right: 0;
    background-color: #fff;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 9999;
  }
`;

const NavLink = styled.a`
  color: var(--dark-color);
  text-decoration: none;
  transition: color 0.3s ease;
  font-weight: 500;

  &:hover {
    color: var(--primary-color);
    text-decoration: none;
  }

  &.active {
    color: var(--primary-color);
    font-weight: 600;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    display: block;
  }
`;

const GithubButton = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--dark-color);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s ease;
  font-weight: 500;

  &:hover {
    background-color: #555;
    text-decoration: none;
    color: white;
  }
`;

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Nav>
      <LogoContainer>
        {/* <Link href="/" passHref>
          <a>
            <img src="/images/voca-logo.png" alt="voca-http logo" width={32} height={32} />
          </a>
        </Link> */}
        <Logo>
          <Link href="/">
            <a>Voca HTTP</a>
          </Link>
        </Logo>
      </LogoContainer>

      <MenuButton onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '✕' : '☰'}
      </MenuButton>

      <NavLinks isOpen={isOpen}>
        <Link href="/" passHref>
          <NavLink>Home</NavLink>
        </Link>
        <Link href="/docs" passHref>
          <NavLink>Documentation</NavLink>
        </Link>
        <Link href="/examples" passHref>
          <NavLink>Examples</NavLink>
        </Link>
        <GithubButton href="https://github.com/Subhojit1992/voca-http" target="_blank" rel="noopener noreferrer">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
          </svg>
          GitHub
        </GithubButton>
      </NavLinks>
    </Nav>
  );
};

export default Navbar; 