import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #0F172A;
  color: #E2E8F0;
  font-family: 'Inter', sans-serif;
  padding: 2rem;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 3rem;
  width: 100%;
  max-width: 600px;
  text-align: center;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const Subtext = styled.p`
  color: #94A3B8;
  font-size: 1.1rem;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

export const UnimplementedBox = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px dashed rgba(255, 255, 255, 0.2);
  margin-top: 1rem;
`;
