import React from 'react';
import styled from 'styled-components';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const IconWrapper = styled.div`
  color: var(--primary-color);
  font-size: 2.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h3`
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
`;

const Description = styled.p`
  color: var(--grey-color);
  margin-bottom: 0;
  flex-grow: 1;
`;

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
  return (
    <Card>
      <IconWrapper>{icon}</IconWrapper>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Card>
  );
};

export default FeatureCard; 