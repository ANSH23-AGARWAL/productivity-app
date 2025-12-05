import styled from 'styled-components';

export const Container = styled.div`
  width: 360px;
  margin: 100px auto;
  padding: 30px;
  text-align: center;
  background-color: #162032; /* Dark Card BG */
  border: 1px solid #1F2940;
  border-radius: 16px;
  font-family: 'Poppins', 'Segoe UI', sans-serif;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5); /* Deep dark shadow */
  color: #FFFFFF;
  position: relative;
  overflow: hidden;

  /* Optional: Add a subtle top border gradient for premium feel */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #4452FE, #2FAFCC, #9B5CFF);
  }
`;

export const Title = styled.h1`
  color: #FFFFFF;
  font-size: 28px;
  margin-bottom: 10px;
  font-weight: 700;
  letter-spacing: 0.5px;
`;

export const SubTitle = styled.p`
  color: #A0AEC0; /* Secondary Text */
  font-size: 15px;
  margin-bottom: 30px;
`;

export const AccountBox = styled.div`
  display: flex;
  align-items: center;
  background-color: #0A0F1F; /* Dark Background Contrast */
  padding: 14px 18px;
  border-radius: 12px;
  cursor: pointer;
  margin: 12px 0;
  border: 1px solid transparent;
  transition: all 0.2s ease;

  &:hover {
    background-color: #1A2333;
    border-color: #4452FE;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
`;

export const Avatar = styled.div`
  background: linear-gradient(135deg, #4452FE, #9B5CFF);
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
  margin-right: 14px;
  box-shadow: 0 2px 10px rgba(68, 82, 254, 0.3);
`;

export const NameText = styled.div`
  font-weight: 600;
  font-size: 15px;
  color: #FFFFFF;
  text-align: left;
`;

export const EmailText = styled.div`
  font-size: 13px;
  color: #A0AEC0;
  text-align: left;
`;

export const AddAccount = styled.button`
  width: 100%;
  padding: 12px;
  font-size: 15px;
  color: #FFFFFF;
  background-color: #1A2333; /* Dark Button */
  border: 1px solid #2D3748;
  border-radius: 12px;
  margin: 20px 0 10px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #253045;
    color: #4452FE;
    border-color: #4452FE;
  }
`;

export const LogoutButton = styled.button`
  background: none;
  border: none;
  color: #A0AEC0;
  font-size: 14px;
  cursor: pointer;
  margin-top: 5px;
  transition: color 0.2s;
  
  &:hover {
    color: #FF6347; /* Warning color for logout, or could use accent #4452FE */
    text-decoration: underline;
  }
`;

export const AccountList = styled.div`
  margin-top: 15px;
`;
