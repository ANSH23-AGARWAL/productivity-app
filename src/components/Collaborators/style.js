import styled from "styled-components";

export const PageWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background: #0A0F1F; /* Deep Dark BG */
  font-family: 'Poppins', sans-serif;
  color: #FFFFFF;
`;

export const Sidebar = styled.div`
  width: 260px;
  background: #162032; /* Dark Card BG */
  border-right: 1px solid #1F2940;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const TabButton = styled.button`
  width: 100%;
  padding: 12px 14px;
  border-radius: 10px;
  text-align: left;
  background: ${({ active }) => (active ? "rgba(68, 82, 254, 0.15)" : "transparent")};
  border: 1px solid ${({ active }) => (active ? "#4452FE" : "transparent")};
  color: ${({ active }) => (active ? "#4452FE" : "#A0AEC0")};
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ active }) => (active ? "rgba(68, 82, 254, 0.25)" : "#1A2333")};
    color: ${({ active }) => (active ? "#4452FE" : "#FFFFFF")};
    transform: translateX(4px);
  }
`;

export const ContentWrapper = styled.div`
  flex: 1;
  padding: 30px 40px;
  overflow-y: auto;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  
  h2 {
    font-size: 28px;
    font-weight: 700;
    letter-spacing: 0.5px;
  }
`;

export const InviteBtn = styled.button`
  background: #4452FE; /* Accent */
  color: white;
  padding: 12px 20px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(68, 82, 254, 0.4);
  transition: all 0.2s;

  &:hover {
    background: #3545CC;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(68, 82, 254, 0.5);
  }
`;

export const SectionTitle = styled.h3`
  margin-top: 30px;
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 600;
  color: #FFFFFF;
  border-bottom: 1px solid #1F2940;
  padding-bottom: 10px;
`;

export const Card = styled.div`
  background: #162032; /* Dark Card BG */
  padding: 24px;
  border-radius: 16px;
  border: 1px solid #1F2940;
  margin-bottom: 25px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;

  &:hover {
    border-color: #2D3748;
  }
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  p, span {
    color: #A0AEC0;
  }
  
  strong {
    color: #FFFFFF;
    font-weight: 600;
  }
`;

export const SecondaryBtn = styled.button`
  background: #1A2333;
  color: #FFFFFF;
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid #2D3748;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;

  &:hover {
    background: #2D3748;
    border-color: #4A5568;
  }
`;

export const DangerBtn = styled.button`
  background: rgba(255, 77, 79, 0.15);
  color: #FF4D4F;
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid rgba(255, 77, 79, 0.3);
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 77, 79, 0.25);
    border-color: #FF4D4F;
    transform: translateY(-1px);
  }
`;

export const CopyBadge = styled.span`
  display: inline-block;
  margin-left: 12px;
  color: #2FAFCC; /* Teal Accent */
  font-weight: 600;
  font-size: 0.9rem;
  background: rgba(47, 175, 204, 0.15);
  padding: 4px 8px;
  border-radius: 6px;
`;
