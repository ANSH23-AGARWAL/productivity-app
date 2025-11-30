import styled from 'styled-components';

export const Container = styled.div`
  width: 360px;
  margin: 100px auto;
  padding: 30px;
  text-align: center;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  font-family: 'Segoe UI', sans-serif;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
`;

export const Title = styled.h1`
  color: #0052cc;
  font-size: 28px;
  margin-bottom: 10px;
`;

export const SubTitle = styled.p`
  color: #333;
  font-size: 16px;
  margin-bottom: 20px;
`;

export const AccountBox = styled.div`
  display: flex;
  align-items: center;
  background-color: #f4f5f7;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  margin: 8px 0;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e1e4e9;
  }
`;

export const Avatar = styled.div`
  background-color: #0052cc;
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
  margin-right: 12px;
`;

export const NameText = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: #172b4d;
`;

export const EmailText = styled.div`
  font-size: 13px;
  color: #5e6c84;
`;

export const AddAccount = styled.button`
  width: 100%;
  padding: 10px;
  font-size: 15px;
  color: #172b4d;
  background-color: #ebecf0;
  border: none;
  border-radius: 8px;
  margin: 10px 0;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #dfe1e6;
  }
`;

export const LogoutButton = styled.button`
  background: none;
  border: none;
  color: #0052cc;
  font-size: 14px;
  cursor: pointer;
  text-decoration: underline;
  &:hover {
    color: #0747a6;
  }
`;

export const AccountList = styled.div`
  margin-top: 10px;
`;
